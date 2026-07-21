export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  isLive: boolean;
  timeAgo: string;
  viralityScore: number;
}

export interface CarouselSlide {
  type: 'title' | 'content';
  headline: string;
  subheading: string;
  points?: string[];
}

export type CarouselTheme = 'punk-original' | 'punk-bw' | 'punk-neon' | 'punk-cyber' | 'punk-crimson' | 'punk-gold' | 'punk-royal' | 'youth-orange' | 'torn-vintage' | 'corp-red' | 'classic-red' | 'classic-blue' | 'classic-dark';
