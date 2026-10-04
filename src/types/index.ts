export type HazardType = 'police' | 'camera' | 'accident' | 'roadworks' | 'hazard' | 'traffic';

export type PoliceType =
  | 'fixed-camera'
  | 'mobile-camera'
  | 'marked-police'
  | 'highway-patrol'
  | 'unmarked-police';

export type HazardMarker = {
  id: string;
  type: HazardType;
  policeType?: PoliceType;
  latitude: number;
  longitude: number;
  title: string;
  note?: string;
  severity: 'low' | 'medium' | 'high';
  lastConfirmedAt: string;
  active: boolean;
};

export type RouteOption = {
  id: string;
  label: string;
  eta: string;
  distance: string;
  traffic: string;
  score: string;
  alerts: HazardType[];
  quietScore: number;
};

export const hazardTypeColors: Record<HazardType | string, string> = {
  police: '#FDE68A',
  camera: '#FCA5A5',
  accident: '#F87171',
  roadworks: '#FDBA74',
  hazard: '#93C5FD',
  traffic: '#A7F3D0',
};

export const policeTypeLabels: Record<PoliceType, string> = {
  'fixed-camera': 'Fixed speed camera',
  'mobile-camera': 'Mobile speed camera',
  'marked-police': 'Marked police car',
  'highway-patrol': 'Highway patrol',
  'unmarked-police': 'Unmarked police',
};
