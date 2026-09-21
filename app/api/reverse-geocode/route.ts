import { DISTRICTS } from "@/app/lib/menu";

// Reverse geocoding through OpenStreetMap's Nominatim. It's proxied from the server
// so we can send the identifying User-Agent its usage policy requires.
const NOMINATIM = "https://nominatim.openstreetmap.org/reverse";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const KNOWN = Object.keys(DISTRICTS);

interface NominatimAddress {
  road?: string;
  pedestrian?: string;
  house_number?: string;
  [key: string]: string | undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return Response.json({ error: "Coordenadas inválidas" }, { status: 400 });
  }

  const url = new URL(NOMINATIM);
  url.search = new URLSearchParams({
    format: "jsonv2",
    lat: lat.toFixed(6),
    lon: lon.toFixed(6),
    zoom: "18",
    addressdetails: "1",
    "accept-language": "es",
  }).toString();

  const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": `RealBroaster-website/1.0${site ? ` (+https://${site})` : ""}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ error: "Servicio de direcciones no disponible" }, { status: 502 });

    const data = (await res.json()) as { address?: NominatimAddress };
    const a = data.address ?? {};

    const road = a.road ?? a.pedestrian;
    const street = road ? [road, a.house_number].filter(Boolean).join(" ") : null;

    // The area name can sit in different fields depending on the map data.
    const areaFields = ["suburb", "city_district", "neighbourhood", "quarter", "town", "municipality", "village", "county", "city"];
    const areas = areaFields.map((f) => a[f]).filter((v): v is string => !!v);
    const district = KNOWN.find((d) => areas.some((v) => normalize(v) === normalize(d))) ?? null;

    return Response.json({ street, district, area: areas[0] ?? null });
  } catch {
    return Response.json({ error: "No se pudo consultar la dirección" }, { status: 502 });
  }
}
