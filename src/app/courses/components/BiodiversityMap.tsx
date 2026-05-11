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

// Extend window to include Leaflet
declare global {
  interface Window {
    L?: {
      map: (
        el: HTMLElement,
        options?: unknown
      ) => {
        setView: (center: [number, number], zoom: number) => unknown;
        invalidateSize: () => void;
      };
      tileLayer: (url: string, options: unknown) => { addTo: (map: unknown) => unknown };
      marker: (
        coords: [number, number],
        options?: unknown
      ) => {
        addTo: (map: unknown) => {
          addTo: (map: unknown) => unknown;
          bindPopup: (content: string) => unknown;
        };
        bindPopup: (content: string) => unknown;
      };
    };
  }
}

export default function BiodiversityMap({ hotspots }: BiodiversityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadLeaflet = async () => {
      try {
        // Check if Leaflet is already loaded
        if (window.L) {
          initMap();
          return;
        }

        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        // Load Leaflet JS
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Leaflet'));
          document.head.appendChild(script);
        });

        initMap();
      } catch (_err) {
        setError('Failed to load map');
        setIsLoading(false);
      }
    };

    const initMap = () => {
      if (!mapRef.current || !window.L) return;

      // Check if map already initialized
      if (mapRef.current.querySelector('.leaflet-container')) {
        setIsLoading(false);
        return;
      }

      const L = window.L;

      const map = L.map(mapRef.current, {
        center: [22.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      }).addTo(map);

      hotspots.forEach((spot) => {
        const marker = L.marker(spot.coords as [number, number], {
          title: spot.name,
        }).addTo(map);
        marker.bindPopup(`<strong>${spot.name}</strong><br>${spot.description}`);
      });

      // Force map to recalculate size
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      setIsLoading(false);
    };

    loadLeaflet();
  }, [hotspots]);

  if (error) {
    return (
      <div className="my-8 rounded-xl overflow-hidden border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-8 text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

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
      <div
        ref={mapRef}
        className={`h-[400px] w-full ${isLoading ? 'hidden' : ''}`}
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
