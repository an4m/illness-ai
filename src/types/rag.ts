import { LucideIcon } from 'lucide-react';

export type RAGStatus = 'green' | 'amber' | 'red';

export interface RAGButton {
  text: string;
  icon: LucideIcon;
  color: string;
}

export interface RAGFollowUp {
  show: boolean;
  text?: string;
}

export interface RAGAction {
  text: string;
  urgentText?: string;
  buttons: RAGButton[];
}

export interface RAGResult {
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  title: string;
  subtitle: string;
  message: string;
  advice: string[];
  redFlags?: string[];
  emergencyCode?: string;
  followUp: RAGFollowUp;
  action: RAGAction;
}

export type RAGResults = Record<RAGStatus, RAGResult>;
