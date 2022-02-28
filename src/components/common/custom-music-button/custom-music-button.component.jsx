import React from 'react';

import CustomIconButton from '../custom-icon-button/custom-icon-button.component';
import useAudio from '../../../hooks/useAudio/useAudio.component';

export default function CustomMusicButton({soundUrl}) {
  const [ isPlaying, toggleIsPlaying ] = useAudio(soundUrl);

  console.log('isPlaying: ', isPlaying);

  return (
    <CustomIconButton iconClassName={isPlaying ? 'fas fa-stop' : 'fas fa-music'} handler={toggleIsPlaying}/>
  );
}