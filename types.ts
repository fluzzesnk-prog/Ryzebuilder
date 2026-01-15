
export interface GeneratedSite {
  html: string;
  timestamp: number;
  description: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type AppView = 'chat' | 'builder' | 'niches' | 'opportunities' | 'intelligence' | 'prospector' | 'projects' | 'outreach' | 'settings';

export interface UserIdentity {
  name: string;
  specialty: string;
  experience: string;
  apiKey?: string;
}

export interface Niche {
  id: string;
  title: string;
  icon: string;
  problems: string[];
  solutions: string[];
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  niche: string;
  difficulty: 'Baixa' | 'Média' | 'Alta';
  estimatedValue: string;
  demand: string;
}

export type VisualPreset = 'minimalist' | 'cyberpunk' | 'corporate' | 'luxury' | 'playful';

export interface Lead {
  name: string;
  address: string;
  rating?: number;
  uri?: string;
}

export interface SavedProject {
  id: string;
  name: string;
  html: string;
  description: string;
  history: string[];
  timestamp: number;
}
