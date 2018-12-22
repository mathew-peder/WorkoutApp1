import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Schedules from '../components/Schedules'
import AddSchedule from '../components/AddSchedule'
import Progress from '../components/Progress'
import AddProgress from '../components/AddProgress'
import About from '../components/About'
import Contact from '../components/Contact'
import EditProgress from '../components/EditProgress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editprogress',
      name: 'EditProgress',
      component: EditProgress,
      props: true
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/schedules',
      name: 'Schedules',
      component: Schedules
    },
    {
      path: '/progress',
      name: 'Progress',
      component: Progress
    },
    {
      path: '/addschedule',
      name: 'AddSchedule',
      component: AddSchedule,
      props: true
    },
    {
      path: '/addprogress',
      name: 'AddProgress',
      component: AddProgress,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
