import Login from '../components/login';
import Home from '../components/home';
import BaseList from '../components/baselist';
import Writer from '../components/writer'

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
          path: '/home/baselist/',
          component: BaseList
        },
        {
          path: '/home/writeanarticle',
          component: Writer
        },
      ]
    }
  ]
  
  export default routes