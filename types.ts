
export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceTag: string;
  gradient: string;
  whatsappMessage: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface MarqueeItem {
  text: string;
}

export interface Song {
  title: string;
  artist: string;
  src: string;
}
