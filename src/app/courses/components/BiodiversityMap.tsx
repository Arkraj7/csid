'use client';

import { useEffect, useRef, useState } from 'react';

type Hotspot = {
  name: string;
  coords: [number, number];
  description: string;
};

type BiodiversityMapProps = {
  hotspots: Hotspot[];
};

// Leaflet is loaded via script tag, so we declare it on window
declare global {
  interface Window {
    L: {
      map: (el: HTMLElement) => unknown;
      tileLayer: (url: string, options: unknown) => unknown;
      marker: (coords: [number, number]) => unknown;
    };
  }
}

export default function BiodiversityMap({ hotspots }: BiodiversityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (typeof window.L === 'undefined') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = () => {
          setIsLoading(false);
          createMap();
        };
        document.head.appendChild(script);
      } else {
        setIsLoading(false);
        createMap();
      }
    };

    const createMap = () => {
      if (!mapRef.current || mapRef.current.querySelector('.leaflet-container')) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = window.L as any;
      const map = L.map(mapRef.current).setView([22.5937, 78.9629], 5);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      hotspots.forEach((spot) => {
        const marker = L.marker(spot.coords).addTo(map);
        marker.bindPopup(`<b>${spot.name}</b><br>${spot.description}`);
      });
    };

    initMap();
  }, [hotspots]);

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {isLoading && (
        <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className={`h-[400px] w-full ${isLoading ? 'hidden' : ''}`} />
    </div>
  );
}
