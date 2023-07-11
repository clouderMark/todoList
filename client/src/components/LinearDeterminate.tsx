import * as React from 'react';
import {Box, LinearProgress} from '@mui/material/';

const LinearDeterminate = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }

        const diff = Math.random() * 10;

        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        '& .MuiLinearProgress-colorPrimary': {
          backgroundColor: 'transparent',
        },
        '& .MuiLinearProgress-barColorPrimary': {
          backgroundColor: 'tomato',
        },
      }}
    >
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default LinearDeterminate;
