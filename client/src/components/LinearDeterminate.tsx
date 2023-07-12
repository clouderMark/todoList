import * as React from 'react';
import {Box, LinearProgress} from '@mui/material/';
import {useSelector} from 'react-redux';
import {selectLoader} from '../redux/loaderSlice';

const LinearDeterminate = () => {
  const {isOpen} = useSelector(selectLoader);
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
    <>
      {isOpen ? (
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
      ) : null}
    </>
  );
};

export default LinearDeterminate;
