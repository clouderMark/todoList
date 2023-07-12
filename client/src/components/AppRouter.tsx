import {Route, Routes} from 'react-router-dom';
import Login from '../views/Login/Login';
import NotFound from '../views/NotFound';
import Todolist from '../views/Todolist';
import {EPath} from '../enums/EPath';
import {useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath;
  [ERoute.Component](): JSX.Element;
}

const publicRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Login, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.Signup, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: NotFound},
];

const authRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.TodoList, [ERoute.Component]: Todolist},
];

const adminRoutes: IRoute[] = [];

const AppRouter = () => {
  const {isAuth, isAdmin} = useAppSelector(selectUser);
  // const location = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  return (
    <Routes>
      {publicRoutes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
      {isAdmin && adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  );
};

export default AppRouter;
