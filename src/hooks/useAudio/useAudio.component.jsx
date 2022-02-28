import React, { useEffect, useMemo, useState } from 'react';

// Not Working:
// - playing after page reload
// - break audio element reference after signout
//   (user can still manipulate sound via browser notification on mobile device)

export default function useAudio(audioUrl) {
  const audio = useMemo(() => new Audio(audioUrl), []);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleIsPlaying = () => {
    setIsPlaying((prevValue) => !prevValue);
  }

  useEffect(async () => {
    if(isPlaying) {
      audio.volume = 0.3;
      await audio.play();
    } else {
      audio.currentTime = 0;
      audio.pause();
    }
  }, [isPlaying])

  useEffect(() => {
    audio.addEventListener('ended', async function() {
      this.currentTime = 0;
      await this.play();
    }, false);
    return () => {
      audio.removeEventListener('ended', async function() {
        this.currentTime = 0;
        await this.play();
      })
      audio.currentTime = 0;
      audio.pause();
    };
  }, [])

  return [isPlaying, toggleIsPlaying];
}