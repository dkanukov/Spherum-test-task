import { createRouter, createWebHistory } from 'vue-router'
import mainView from "@/views/mainView";

const routes = [
  {
    path: '/',
    name: 'shop',
    component: mainView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
