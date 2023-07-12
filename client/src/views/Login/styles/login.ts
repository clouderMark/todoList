const queryTablet = 1050;
const mobileTablet = 750;

export const login = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  card: {
    width: '50%',
    p: 5,
    mb: 15,

    [`@media (max-width: ${mobileTablet}px)`]: {
      width: '100%',
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  buttonBox: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2,
    mb: 2,
    p: 3,

    [`@media (max-width: ${queryTablet}px)`]: {
      flexDirection: 'column',
      p: 0,
    },
  },

  isLogin: {
    mt: 'auto',

    [`@media (max-width: ${queryTablet}px)`]: {
      mt: 2,
    },
  },
};
