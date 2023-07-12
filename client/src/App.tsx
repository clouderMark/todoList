import {CssBaseline} from '@mui/material';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {login, logout, getToken, selectUser} from './redux/userSlice';
import AlertLine from './components/AlertLine/AlertLine';
import Loader from './components/LinearDeterminate';
import {closeLoader, setShowLoader} from './redux/loaderSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const [checkUser, {data: checkUserData, isSuccess: isCheckUserSuccess, isError: isCheckUserError}] =
    useCheckUserMutation();
  const {token} = useAppSelector(selectUser);

  useEffect(() => {
    if (token) {
      checkUser(token);
      dispatch(setShowLoader());
    }
  }, [token]);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (isCheckUserSuccess) {
      dispatch(login({token: checkUserData!.token}));
      dispatch(closeLoader());
    }
  }, [isCheckUserSuccess]);

  useEffect(() => {
    if (isCheckUserError) {
      dispatch(logout());
      dispatch(closeLoader());
    }
  }, [isCheckUserError]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Loader />
      <AppRouter />
      <AlertLine />
    </BrowserRouter>
  );
};

export default App;
