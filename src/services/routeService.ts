import { HazardMarker, HazardType, RouteOption } from '../types';

const routeSeeds: Array<RouteOption> = [
  {
    id: 'quiet-route',
    label: 'Quiet route',
    eta: '18 min',
    distance: '5.8 km',
    traffic: 'Light',
    score: '92%',
    quietScore: 92,
    alerts: ['police', 'camera'],
  },
  {
    id: 'local-backroads',
    label: 'Local back roads',
    eta: '20 min',
    distance: '6.4 km',
    traffic: 'Very light',
    score: '86%',
    quietScore: 86,
    alerts: ['hazard'],
  },
  {
    id: 'fastest-route',
    label: 'Fastest route',
    eta: '15 min',
    distance: '5.1 km',
    traffic: 'Heavy',
    score: '68%',
    quietScore: 62,
    alerts: ['traffic', 'roadworks'],
  },
];

export function buildRouteOptions(start: string, finish: string): RouteOption[] {
  return routeSeeds.map((route) => ({
    ...route,
    label: `${route.label} • ${start} → ${finish}`,
  }));
}

export function minutesSince(timestamp: string): number {
  return Math.max(0, (Date.now() - new Date(timestamp).getTime()) / 60000);
}

export function getAlertPriority(hazard: HazardMarker): number {
  const ageMinutes = minutesSince(hazard.lastConfirmedAt);

  const base =
    hazard.type === 'police' ? 100 :
    hazard.type === 'camera' ? 80 :
    hazard.type === 'accident' ? 75 :
    hazard.type === 'roadworks' ? 50 :
    hazard.type === 'hazard' ? 45 :
    35;

  const recencyDecay = Math.max(0, 100 - ageMinutes * 2.2);
  const severityBoost =
    hazard.severity === 'high' ? 18 :
    hazard.severity === 'medium' ? 10 :
    4;

  return Math.max(0, Math.min(100, base + recencyDecay + severityBoost));
}

export function getSampleHazards(): HazardMarker[] {
  return [
    {
      id: 'hazard-1',
      type: 'police',
      latitude: -33.8678,
      longitude: 151.2093,
      title: 'Police radar',
      note: 'Mobile speed check near the shopping strip',
      severity: 'medium',
      lastConfirmedAt: new Date(Date.now() - 2 * 60000).toISOString(),
      active: true,
    },
    {
      id: 'hazard-2',
      type: 'camera',
      latitude: -33.8725,
      longitude: 151.214,
      title: 'Fixed camera',
      note: 'Approach from the eastbound lane',
      severity: 'high',
      lastConfirmedAt: new Date(Date.now() - 9 * 60000).toISOString(),
      active: true,
    },
    {
      id: 'hazard-3',
      type: 'roadworks',
      latitude: -33.876,
      longitude: 151.205,
      title: 'Roadworks',
      note: 'Single lane active during rush hour',
      severity: 'medium',
      lastConfirmedAt: new Date(Date.now() - 18 * 60000).toISOString(),
      active: true,
    },
    {
      id: 'hazard-4',
      type: 'traffic',
      latitude: -33.88,
      longitude: 151.22,
      title: 'Heavy congestion',
      note: 'Main corridor is backed up',
      severity: 'high',
      lastConfirmedAt: new Date(Date.now() - 26 * 60000).toISOString(),
      active: true,
    },
  ];
}

export function getNearbyHazards(
  lat: number,
  lng: number,
  hazards: HazardMarker[],
  radiusMeters = 400
): HazardMarker[] {
  return hazards.filter((hazard) => {
    if (!hazard.active) return false;

    const dLat = hazard.latitude - lat;
    const dLng = hazard.longitude - lng;
    const distance = Math.sqrt(dLat * dLat + dLng * dLng) * 111000;

    return distance <= radiusMeters;
  });
}

export function getHazardByType(type: HazardType): HazardMarker[] {
  return getSampleHazards().filter((hazard) => hazard.type === type);
}
