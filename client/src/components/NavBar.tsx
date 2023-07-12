import {useNavigate} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {logout, selectUser} from '../redux/userSlice';
import {EPath} from '../enums/EPath';
import {reset} from '../redux/todoSlice';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuth) {
      dispatch(logout());
      dispatch(reset());
    } else {
      navigate(EPath.Login);
    }
  };

  return (
    <Box sx={{flexGrow: 1, mb: 5}}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Button onClick={handleClick} color="inherit" sx={{ml: 'auto'}}>
            {isAuth ? 'Выйти' : 'Войти'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
