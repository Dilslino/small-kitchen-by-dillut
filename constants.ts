import { Product, Song } from './types';

export const BRAND_NAME = "Small Kitchen by Dillut";
export const WHATSAPP_NUMBER = "6281281274140";

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

export const PRODUCTS: Product[] = [
  {
    id: 'mochi-01',
    title: "Signature Mochi",
    subtitle: "Lembut, kenyal, sempurna. Isian ganache artisan yang lumer.",
    price: "Rp 15.000",
    priceTag: "Paling Laris",
    gradient: "from-pink-200 to-rose-100",
    whatsappMessage: "Halo Small Kitchen by Dillut! Saya mau pesan Signature Mochi."
  },
  {
    id: 'seblak-01',
    title: "Premium Seblak",
    subtitle: "Pedas, gurih, bikin nagih. Cita rasa rempah asli Indonesia.",
    price: "Rp 12.000",
    priceTag: "Wajib Coba",
    gradient: "from-orange-100 to-red-100",
    whatsappMessage: "Halo Small Kitchen by Dillut! Saya mau pesan Premium Seblak."
  },
  {
    id: 'cookies-01',
    title: "Soft Baked Cookies",
    subtitle: "Cokelat yang lumer di mulut bagaikan awan.",
    price: "Rp 25.000",
    priceTag: "Terbatas",
    gradient: "from-amber-100 to-yellow-50",
    whatsappMessage: "Halo Small Kitchen by Dillut! Saya mau pesan Soft Baked Cookies."
  }
];

export const MARQUEE_TEXT = "OPEN PRE-ORDER 🍡 • Dibuat Segar Setiap Hari • Rasa Otentik • Bahan Berkualitas • Slot Terbatas • ";