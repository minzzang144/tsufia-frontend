import React from 'react';

import * as I from '.';
import * as S from '@atoms/Audio/style';

export const Audio = React.forwardRef<HTMLAudioElement, I.AudioProps>(({ src }, ref) => {
  return (
    <S.Wrapper ref={ref}>
      <source src={src} type="audio/mp3" />
    </S.Wrapper>
  );
});

Audio.displayName = 'Audio';
