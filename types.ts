
export enum Mood {
  EXCITED = '🤩',
  HAPPY = '😊',
  NEUTRAL = '😐',
  SAD = '😔',
  TIRED = '😫',
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: Mood;
  aiReflection?: string;
  tags: string[];
}

export interface UserSettings {
  email: string;
  reminderEnabled: boolean;
  reminderTime: string;
  userName: string;
  notificationsPermission?: 'granted' | 'denied' | 'default';
}

export type View = 'write' | 'history' | 'insights' | 'settings' | 'calendar';
