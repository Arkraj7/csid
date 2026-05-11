'use client';

import { useEffect, useRef } from 'react';

type Hotspot = {
  name: string;
  coords: [number, number];
  description: string;
};

type BiodiversityMapProps = {
  hotspots: Hotspot[];
};

// Leaflet loaded via CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    L?: any;
  }
}

export default function BiodiversityMap({ hotspots }: BiodiversityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (mapContainerRef.current.querySelector('.leaflet-container')) {
      return;
    }

    // Create link element for Leaflet CSS
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(linkEl);

    // Create and load Leaflet script
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    scriptEl.async = true;
    scriptEl.onload = () => {
      initMap();
    };
    document.body.appendChild(scriptEl);

    function initMap() {
      if (!mapContainerRef.current || !window.L) return;

      // Check again if map already initialized
      if (mapContainerRef.current.querySelector('.leaflet-container')) {
        return;
      }

      const L = window.L;

      // Initialize map centered on India
      const map = L.map(mapContainerRef.current).setView([22.5937, 78.9629], 5);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add markers for each hotspot
      hotspots.forEach((spot) => {
        const marker = L.marker(spot.coords).addTo(map);
        marker.bindPopup(`
          <div style="min-width: 200px;">
            <strong style="font-size: 14px; color: #1a5f2a;">${spot.name}</strong>
            <p style="margin: 8px 0 0; font-size: 13px; color: #333;">${spot.description}</p>
          </div>
        `);
      });
    }

    // Cleanup function
    return () => {
      // Don't remove Leaflet on unmount as it might be needed elsewhere
    };
  }, [hotspots]);

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div ref={mapContainerRef} className="h-[450px] w-full" style={{ minHeight: '450px' }} />
    </div>
  );
}
