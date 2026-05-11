'use client';

type Hotspot = {
  name: string;
  coords: [number, number];
  description: string;
};

type BiodiversityMapProps = {
  hotspots: Hotspot[];
};

export default function BiodiversityMap({ hotspots }: BiodiversityMapProps) {
  const markersParam = hotspots
    .map((spot) => `${spot.coords[0]},${spot.coords[1]},${encodeURIComponent(spot.name)}`)
    .join('|');

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=68.0,6.0,92.0,36.0&layer=mapnik&marker=${markersParam}`;

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <iframe
        src={mapUrl}
        width="100%"
        height="400"
        frameBorder="0"
        title="India Biodiversity Hotspots Map"
        className="w-full"
        style={{ border: 0, height: '400px' }}
      />
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Key Biodiversity Hotspots
        </h4>
        <ul className="space-y-2">
          {hotspots.map((spot, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-green-600 dark:text-green-400">{spot.name}:</span>{' '}
              {spot.description.substring(0, 80)}...
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
