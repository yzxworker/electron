import Login from '../components/login';
import Home from '../components/home';
import BaseList from '../components/baselist';
const routes = [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/baselist',
          component: BaseList
        }
      ]
    }
  ]
  
  export default routes