'use client';

import { useEffect, useRef } from 'react';

type Hotspot = {
  name: string;
  coords: [number, number];
  description: string;
  color?: string;
};

type BiodiversityMapProps = {
  hotspots?: Hotspot[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    L?: any;
  }
}

// Global biodiversity hotspots data
const globalHotspots: Hotspot[] = [
  {
    name: 'Madagascar',
    coords: [-18.7669, 46.8691],
    color: '#e74c3c',
    description: 'Home to 5% of world species, 90% endemic. Lemurs, chameleons, baobabs.',
  },
  {
    name: 'Sundaland',
    coords: [-0.5, 110],
    color: '#f39c12',
    description: "Sumatra, Borneo, Java. Tigers, orangutans, world's oldest rainforests.",
  },
  {
    name: 'Wallacea',
    coords: [-4, 127],
    color: '#9b59b6',
    description: 'Between Asian & Australian fauna. Birds of paradise, marsupials.',
  },
  {
    name: 'Indo-Burma',
    coords: [16, 100],
    color: '#e67e22',
    description: 'Mekong region. Gibbons, Asian elephants, tropical forests.',
  },
  {
    name: 'Western Ghats & Sri Lanka',
    coords: [10, 77],
    color: '#2ecc71',
    description: 'Evergreen forests, 60% endemic species, ancient mountain range.',
  },
  {
    name: 'Himalaya',
    coords: [28, 85],
    color: '#3498db',
    description: "Snow leopard, Himalayan tahr, world's highest biodiversity.",
  },
  {
    name: 'Eastern Himalayas',
    coords: [27, 88],
    color: '#1abc9c',
    description: 'Sikkim, Bhutan, Arunachal. Rhododendrons, medicinal plants.',
  },
  {
    name: 'Mountains of Central Asia',
    coords: [42, 78],
    color: '#34495e',
    description: 'Marco Polo sheep, snow leopard, high-altitude deserts.',
  },
  {
    name: 'Caucasus',
    coords: [43, 45],
    color: '#e74c3c',
    description: 'Europe-Asia bridge. Wolves, bezoar goat, ancient vineyards.',
  },
  {
    name: 'Mediterranean Basin',
    coords: [38, 15],
    color: '#27ae60',
    description: '2,400 endemic plants, Olive trees, olive groves, Mediterranean climate.',
  },
  {
    name: 'Caribbean Islands',
    coords: [20, -75],
    color: '#f1c40f',
    description: 'Jamaica, Cuba, Hispaniola. Coral reefs, iguanas, unique bird species.',
  },
  {
    name: 'California Floristic Province',
    coords: [36, -120],
    color: '#16a085',
    description: 'Coast redwoods, giant sequoias, highest plant endemism in US.',
  },
  {
    name: ' Madrean Pine-Oak Woodlands',
    coords: [24, -102],
    color: '#8e44ad',
    description: 'Mexico. Jaguars, resplendent quetzal, diverse oaks and pines.',
  },
  {
    name: 'Biodiversity Hotspot',
    coords: [8, -1],
    color: '#e67e22',
    description: 'Guinean forest of West Africa. Chimpanzees, forest elephants.',
  },
  {
    name: 'Eastern Montane Forest',
    coords: [-3, 28],
    color: '#d35400',
    description: 'Albertine Rift. Gorillas, chimpanzees, 50% of African bird species.',
  },
  {
    name: 'Horn of Africa',
    coords: [8, 42],
    color: '#c0392b',
    description: 'Somalia, Ethiopia. Endemic reptiles, Ethiopian wolf, Arabian leopards.',
  },
  {
    name: 'Mesoamerica',
    coords: [15, -90],
    color: '#2c3e50',
    description: 'Mexico to Panama. Howler monkeys, quetzals, Mesoamerican reef.',
  },
  {
    name: 'Tropical Andes',
    coords: [-15, -70],
    color: '#e74c3c',
    description: 'Peru, Bolivia, Colombia. 20% world plant species, Machu Picchu region.',
  },
  {
    name: 'Brazilian Atlantic Forest',
    coords: [-13, -42],
    color: '#27ae60',
    description: 'Lion tamarins, jaguars, 8% world species, 20,000 plant species.',
  },
  {
    name: 'Cerrado',
    coords: [-15, -52],
    color: '#f39c12',
    description: 'Brazilian savanna. Giant anteaters, armadillos, 4,400 plant species.',
  },
  {
    name: 'Chilean Winter Rainfall',
    coords: [-35, -71],
    color: '#9b59b6',
    description: 'Mediterranean climate, CONAF wilderness areas, unique flora.',
  },
  {
    name: 'Polynesia-Micronesia',
    coords: [-15, -145],
    color: '#3498db',
    description: 'Pacific islands. Marine biodiversity, coconut crabs, land snails.',
  },
  {
    name: 'New Caledonia',
    coords: [-20, 164],
    color: '#1abc9c',
    description: 'New Caledonia. Kagu bird, unique plants, lagoon biodiversity.',
  },
  {
    name: 'New Zealand',
    coords: [-41, 174],
    color: '#e67e22',
    description: 'Kiwis, kakapos, ancient podocarps, unique flightless birds.',
  },
  {
    name: 'Southwest Australia',
    coords: [-32, 118],
    color: '#2ecc71',
    description: 'Banksias, wildflowers, 80% endemic species, kwongan heath.',
  },
  {
    name: 'Southeast Australia',
    coords: [-33, 147],
    color: '#34495e',
    description: 'Kangaroos, koalas, unique marsupials, eucalypt forests.',
  },
  {
    name: 'Japan',
    coords: [36, 138],
    color: '#e74c3c',
    description: 'Snow monkeys, Japanese macaques, unique cherry blossoms.',
  },
  {
    name: 'East Melanesian Islands',
    coords: [-6, 156],
    color: '#f39c12',
    description: 'Solomon Islands, Vanuatu. Birds of paradise, marine life.',
  },
  {
    name: 'Borneo',
    coords: [1, 114],
    color: '#9b59b6',
    description: 'Pygmy elephants, proboscis monkeys, coral triangle.',
  },
  {
    name: 'Philippines',
    coords: [12, 122],
    color: '#3498db',
    description: "Coral triangle, world's second largest reef biodiversity.",
  },
  {
    name: 'Eastern Iran',
    coords: [33, 58],
    color: '#1abc9c',
    description: 'Desert biodiversity, goitered gazelles, markhor.',
  },
  {
    name: 'Irano-Anatolian',
    coords: [36, 46],
    color: '#e67e22',
    description: 'Turkey, Iran. Persian fallow deer, Asiatic cheetah.',
  },
  {
    name: 'Mountains of the Mediterranean',
    coords: [36, 20],
    color: '#d35400',
    description: 'Balkan peninsula. Pygmy suslik, Balkan lynx, old growth forests.',
  },
  {
    name: 'Afromontane',
    coords: [0, 30],
    color: '#16a085',
    description: 'African mountains. Rwenzori, Ethiopian highlands, endemic bird species.',
  },
  {
    name: 'Western Indian Ocean',
    coords: [-15, 50],
    color: '#8e44ad',
    description: 'Madagascar, Seychelles. Lemurs, baobabs, marine ecosystems.',
  },
  {
    name: 'Mascarene Islands',
    coords: [-20, 58],
    color: '#e74c3c',
    description: 'Mauritius, Réunion, Rodrigues. Dodo ancestors, endemic birds.',
  },
];

export default function BiodiversityMap({ hotspots }: BiodiversityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const markers = hotspots && hotspots.length > 0 ? hotspots : globalHotspots;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapContainerRef.current.querySelector('.leaflet-container')) {
      return;
    }

    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(linkEl);

    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    scriptEl.async = true;
    scriptEl.onload = () => {
      initMap();
    };
    document.body.appendChild(scriptEl);

    function initMap() {
      if (!mapContainerRef.current || !window.L) return;

      if (mapContainerRef.current.querySelector('.leaflet-container')) {
        return;
      }

      const L = window.L;

      const map = L.map(mapContainerRef.current).setView([20, 0], 2);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add markers with custom colored icons
      markers.forEach((spot) => {
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${spot.color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker(spot.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="min-width: 250px;">
            <strong style="font-size: 15px; color: ${spot.color};">${spot.name}</strong>
            <p style="margin: 8px 0 0; font-size: 13px; color: #333; line-height: 1.4;">${spot.description}</p>
          </div>
        `);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markers]);

  return (
    <div className="my-8">
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          World&apos;s 36 Biodiversity Hotspots
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          These 36 regions contain over 60% of the world&apos;s terrestrial biodiversity. Click on
          any marker to learn more.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {globalHotspots.slice(0, 8).map((spot, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: spot.color }} />
              <span className="text-xs text-gray-600 dark:text-gray-300">{spot.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div ref={mapContainerRef} className="h-[500px] w-full" style={{ minHeight: '500px' }} />
      </div>
    </div>
  );
}
