import { HazardType, RouteOption } from '../types';

const routeSeeds: Array<RouteOption> = [
  {
    id: 'quiet-route',
    label: 'Quiet route',
    eta: '18 min',
    distance: '5.8 km',
    traffic: 'Light',
    score: '92%',
    alerts: ['police', 'camera'],
  },
  {
    id: 'fastest-route',
    label: 'Fastest route',
    eta: '15 min',
    distance: '5.1 km',
    traffic: 'Heavy',
    score: '68%',
    alerts: ['traffic', 'roadworks'],
  },
  {
    id: 'local-backroads',
    label: 'Local back roads',
    eta: '20 min',
    distance: '6.4 km',
    traffic: 'Very light',
    score: '86%',
    alerts: ['hazard'],
  },
];

export function buildRouteOptions(start: string, finish: string): RouteOption[] {
  return routeSeeds.map((route) => ({
    ...route,
    label: `${route.label} • ${start} → ${finish}`,
  }));
}
