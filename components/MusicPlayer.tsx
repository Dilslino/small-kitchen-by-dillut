import React, { useState, useRef, useEffect } from 'react';
import { PLAYLIST } from '../constants';
import { Pause, Play, SkipForward } from 'lucide-react';
import { GlassCard } from './UI/GlassCard';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ensure playlist safety
  const currentSong = PLAYLIST[currentSongIndex] || PLAYLIST[0];

  useEffect(() => {
    // Attempt autoplay on mount with a slight delay to ensure DOM readiness
    const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.5; // Set nice background volume
          const playPromise = audioRef.current.play();
    
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                // Autoplay was prevented by browser policy
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
              });
          }
        }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(e => {
                    console.error("Play error:", e);
                    setIsPlaying(false);
                });
        }
      }
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
    // Determine play state based on user intention; 
    // if they click next, they usually want to hear the music.
    setIsPlaying(true); 
  };

  const handleEnded = () => {
    nextSong();
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="rounded-full p-0 overflow-hidden 
        bg-gradient-to-br from-white/60 to-white/30 
        backdrop-blur-2xl border border-white/60 
        shadow-[0_8px_24px_rgba(216,167,177,0.2),inset_0_0_24px_rgba(255,255,255,0.3)]"
      >
        <audio 
            key={currentSong.src} 
            ref={audioRef} 
            src={currentSong.src} 
            onEnded={handleEnded}
            onError={handleError}
            autoPlay={isPlaying}
        />
        
        <div className="flex items-center gap-2 px-2 py-1.5">
          <button 
            onClick={togglePlay}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center 
              bg-gradient-to-br from-pink-400 to-rose-300
              text-white shadow-sm transition-all active:scale-90 hover:shadow-md
            `}
          >
            {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
          </button>

          <div className="flex flex-col justify-center w-20 overflow-hidden">
            <span className="text-[10px] font-heading font-semibold text-brand-dark truncate">
              {currentSong.title}
            </span>
            {isPlaying && (
              <div className="flex gap-[2px] items-end h-2 mt-0.5">
                <div className="w-[2px] h-1.5 bg-pink-400 rounded-full animate-[bounce_0.8s_infinite]"></div>
                <div className="w-[2px] h-2 bg-pink-400 rounded-full animate-[bounce_1s_infinite]"></div>
                <div className="w-[2px] h-1 bg-pink-400 rounded-full animate-[bounce_0.6s_infinite]"></div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};