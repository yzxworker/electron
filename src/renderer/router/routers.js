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
          path: '/home/baselist/:basename',
          component: BaseList
        }
      ]
    }
  ]
  
  export default routes