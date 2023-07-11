import {CssBaseline} from '@mui/material';
import {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {login, logout, getToken, selectUser} from './redux/userSlice';
import AlertLine from './components/AlertLine/AlertLine';
import Loader from './components/LinearDeterminate';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [checkUser, {data: checkUserData, isSuccess: isCheckUserSuccess, isError: isCheckUserError}] =
    useCheckUserMutation();
  const {token} = useAppSelector(selectUser);

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (isCheckUserSuccess) {
      dispatch(login({token: checkUserData!.token}));
    }
  }, [isCheckUserSuccess]);

  useEffect(() => {
    if (isCheckUserError) {
      dispatch(logout());
    }
  }, [isCheckUserError]);

  useEffect(() => {
    setLoading(false);
  }, [checkUserData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
      <AlertLine />
    </BrowserRouter>
  );
};

export default App;
