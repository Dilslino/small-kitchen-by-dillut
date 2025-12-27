import { Product, Song } from './types';

export const BRAND_NAME = "dill's kitchen";
export const WHATSAPP_NUMBER = "6281281274140";
export const INSTAGRAM_URL = "https://instagram.com/dillaadrr";

// NOTE: The previous Pixabay links likely expired, causing "The element has no supported sources".
// Replaced with reliable Creative Commons / Test audio files to ensure playback works.
// In production, host your actual MP3 files on your own CDN (e.g., AWS S3, Cloudinary).
export const PLAYLIST: Song[] = [
  {
    title: "Taylor",
    artist: "Taylor Swift",
    src: "taylor.mp3"
  }
];

export type MochiVariant = {
  id: string;
  label: string;
  price: number; // in IDR
};

export const MOCHI_VARIANTS: MochiVariant[] = [
  { id: 'hitam', label: 'Mochi Hitam', price: 15000 },
  { id: 'hijau', label: 'Mochi Hijau', price: 15000 },
  { id: 'putih', label: 'Mochi Putih', price: 15000 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'mochi',
    title: "Mochi",
    subtitle: "Pilih varian mochi (hitam/hijau/putih) dan tentukan jumlahnya.",
    price: "Mulai Rp 15.000",
    priceTag: "Ready",
    gradient: "from-pink-200 to-rose-100",
    whatsappMessage: "Halo dill's kitchen! Saya mau pesan Mochi."
  }
];

export const MARQUEE_TEXT = "OPEN PRE-ORDER 🍡 • Dibuat Segar Setiap Hari • Rasa Otentik • Bahan Berkualitas • Slot Terbatas • ";