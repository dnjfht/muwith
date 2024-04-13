import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { CiVolume, CiVolumeHigh, CiVolumeMute } from 'react-icons/ci';
import { getPlayerMethodValue } from '../../../../api/youtube_music_api';

interface VolumeControlProps {
  player: YT.Player | null;
}

const PrettoSlider = styled(Slider)({
  color: 'pink',
  width: '86%',
  height: 6,
  margin: '0 auto',
  padding: '4px 0',
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'pink',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export default function VolumeControl({ player }: VolumeControlProps) {
  const soundMutedState = getPlayerMethodValue(player, 'isMuted', false) as boolean;

  // 두 번째 매개변수로 현재 슬라이더의 값을 받습니다. 이 값은 사용자가 설정한 볼륨 값입니다.
  const handleVolumeChange = (event: unknown, newValue: number | number[]) => {
    const volume = newValue as number;
    if (player) {
      player.setVolume(volume);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gridGap: '5%', fontSize: '1.3rem' }}>
      <button
        onClick={(): void => {
          if (player && !soundMutedState) {
            player.mute();
          } else if (player && soundMutedState) {
            player.unMute();
          }
        }}
      >
        {soundMutedState ? <CiVolumeMute /> : <CiVolume />}
      </button>

      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={100}
        onChange={handleVolumeChange}
      />
      <CiVolumeHigh />
    </Box>
  );
}
