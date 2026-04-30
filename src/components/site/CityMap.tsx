import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CITY_COORDS, type Business } from "@/data/content";
import { slugify } from "@/lib/slug";

type Props = {
  businesses: Business[];
  className?: string;
};

// Africa bounding box (approx)
const BOUNDS = { minLat: -35, maxLat: 38, minLng: -18, maxLng: 52 };
const W = 600;
const H = 640;

const project = (lat: number, lng: number) => {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * W;
  const y = H - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H;
  return { x, y };
};

// Stylised Africa silhouette path (simplified, not geographically perfect — editorial map).
const AFRICA_PATH =
  "M 320 60 C 360 55 400 60 430 80 C 470 95 490 130 500 170 C 515 220 520 270 510 320 C 500 370 490 410 470 450 C 450 490 420 530 380 555 C 350 575 320 590 290 595 C 270 600 250 595 235 580 C 215 555 200 525 195 490 C 185 450 170 410 155 370 C 140 330 125 290 130 250 C 135 210 155 175 180 145 C 210 110 250 80 290 65 C 300 62 310 60 320 60 Z M 510 90 C 525 95 530 110 525 125 C 515 135 500 130 495 115 C 495 100 500 92 510 90 Z";

const CityMap = ({ businesses, className = "" }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Group businesses by city
  const groups = useMemo(() => {
    const map = new Map<string, Business[]>();
    for (const b of businesses) {
      if (!CITY_COORDS[b.city]) continue;
      if (!map.has(b.city)) map.set(b.city, []);
      map.get(b.city)!.push(b);
    }
    return Array.from(map.entries()).map(([city, items]) => ({
      city,
      items,
      coord: CITY_COORDS[city],
    }));
  }, [businesses]);

  if (groups.length === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative bg-secondary/40 border border-foreground/10 overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          role="img"
          aria-label="Map of African cities with directory listings"
        >
          {/* Africa silhouette */}
          <path
            d={AFRICA_PATH}
            fill="hsl(var(--foreground) / 0.07)"
            stroke="hsl(var(--foreground) / 0.25)"
            strokeWidth="1"
          />

          {/* Pins */}
          {groups.map(({ city, items, coord }) => {
            const { x, y } = project(coord.lat, coord.lng);
            const isHover = hovered === city;
            const r = Math.min(6 + items.length * 1.2, 14);
            return (
              <g key={city} onMouseEnter={() => setHovered(city)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r={r + 6}
                  fill="hsl(var(--accent) / 0.18)"
                  className={isHover ? "animate-pulse" : ""}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="hsl(var(--accent))"
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  className="fill-foreground font-semibold pointer-events-none"
                  style={{ fontSize: 10 }}
                >
                  {items.length}
                </text>
                <text
                  x={x}
                  y={y - r - 6}
                  textAnchor="middle"
                  className="fill-foreground/80 pointer-events-none"
                  style={{ fontSize: 11, fontFamily: "serif" }}
                >
                  {city}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto bg-background/90 backdrop-blur px-3 py-2 border border-foreground/10 text-[10px] tracking-[0.2em] uppercase text-foreground/70 flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent" />
          <span>{groups.length} cities · {businesses.length} listings</span>
        </div>
      </div>

      {/* Hover detail or full list below */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {groups
          .slice()
          .sort((a, b) => b.items.length - a.items.length)
          .map(({ city, items }) => (
            <div
              key={city}
              onMouseEnter={() => setHovered(city)}
              onMouseLeave={() => setHovered(null)}
              className={`border p-3 transition-colors ${
                hovered === city ? "border-accent bg-accent/5" : "border-foreground/15"
              }`}
            >
              <div className="font-serif text-base">{city}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/55 mt-0.5">
                {items[0].country} · {items.length} {items.length === 1 ? "listing" : "listings"}
              </div>
              <ul className="mt-2 space-y-1">
                {items.slice(0, 3).map((b) => (
                  <li key={b.name}>
                    <Link
                      to={`/business/${slugify(b.name)}`}
                      className="text-xs text-foreground/80 hover:text-accent line-clamp-1"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
                {items.length > 3 && (
                  <li className="text-[10px] tracking-[0.18em] uppercase text-foreground/45">
                    +{items.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CityMap;
