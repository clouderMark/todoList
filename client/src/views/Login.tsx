import {useEffect, FormEvent} from 'react';
import {Box, Button, Card, Container, TextField, Typography} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {EPath} from '../enums/EPath';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {login, selectUser} from '../redux/userSlice';
import {useLoginUserMutation, useSignupUserMutation} from '../redux/userApi';
import {handleAlert} from '../redux/alertSlice';

const Login = () => {
  const {isAuth, isAdmin} = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === EPath.Login;
  const [loginUser, {data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError}] =
    useLoginUserMutation();
  const [signupUser, {data: signupData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError}] =
    useSignupUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) navigate(EPath.TodoList, {replace: true});
    if (isAdmin) navigate(EPath.Admin, {replace: true});
  }, [isAdmin, isAuth]);

  useEffect(() => {
    if (isLoginError && 'data' in loginError!) {
      dispatch(handleAlert({message: loginError.data.message, statusCode: loginError.status}));
    }

    if (isRegisterError && 'data' in registerError!) {
      dispatch(handleAlert({message: registerError.data.message, statusCode: registerError.status}));
    }
  }, [isLoginError, isRegisterError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const email = target.email.value.trim();
    const password = target.password.value.trim();

    if (isLogin) {
      await loginUser({email, password});
    } else {
      await signupUser({email, password});
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(login({token: loginData!.token}));
    }

    if (isRegisterSuccess) {
      dispatch(login({token: signupData!.token}));
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  return (
    <>
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Card style={{width: '50%'}} sx={{p: 5, mb: 15}}>
          <Typography component="h3" sx={{mt: 'auto'}}>
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </Typography>
          <Box component="form" sx={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            <TextField name="email" sx={{mt: 3}} placeholder="Введите ваш email..." />
            <TextField name="password" sx={{mt: 3}} placeholder="Введите ваш пароль..." />
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2, p: 3}}>
              <Button type="submit" variant="outlined">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
              <Typography sx={{mt: 'auto'}}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                <Link to={isLogin ? EPath.Signup : EPath.Login}>{isLogin ? ' Зарегистрируйтесь!' : ' Войдите!'}</Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Login;
