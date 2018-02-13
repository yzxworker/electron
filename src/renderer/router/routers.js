import Login from '../components/login';
import Home from '../components/home';
import BaseList from '../components/baselist';
import Writer from '../components/writer';
import Articledetails from '../components/articledetails';

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
        {
          path: '/home/showarticle/:articleID',
          component: Articledetails
        }
      ]
    }
  ]
  
  export default routes