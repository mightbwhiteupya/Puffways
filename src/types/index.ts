export type HazardType = 'police' | 'camera' | 'accident' | 'roadworks' | 'hazard' | 'traffic';

export type RouteOption = {
  id: string;
  label: string;
  eta: string;
  distance: string;
  traffic: string;
  score: string;
  alerts: HazardType[];
};

export const hazardTypeColors: Record<HazardType | string, string> = {
  police: '#FDE68A',
  camera: '#FCA5A5',
  accident: '#F87171',
  roadworks: '#FDBA74',
  hazard: '#93C5FD',
  traffic: '#A7F3D0',
};
