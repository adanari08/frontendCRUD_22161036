import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import RolesView from '../views/roles/RolesView.vue'
import RolDetalle from '../views/roles/RolDetalle.vue'
import RolForm from '../views/roles/RolForm.vue'

import UsuariosView from '../views/usuarios/UsuariosView.vue'
import UsuarioDetalle from '../views/usuarios/UsuarioDetalle.vue'
import UsuarioForm from '../views/usuarios/UsuarioForm.vue'

import EmpleadosView from '../views/empleados/EmpleadosView.vue'
import EmpleadoDetalle from '../views/empleados/EmpleadoDetalle.vue'
import EmpleadoForm from '../views/empleados/EmpleadoForm.vue'

const routes = [
  { path: '/', component: HomeView },

  { path: '/roles', component: RolesView },
  { path: '/roles/nuevo', component: RolForm },
  { path: '/roles/:id', component: RolDetalle },
  { path: '/roles/:id/editar', component: RolForm },

  { path: '/usuarios', component: UsuariosView },
  { path: '/usuarios/nuevo', component: UsuarioForm },
  { path: '/usuarios/:id', component: UsuarioDetalle },
  { path: '/usuarios/:id/editar', component: UsuarioForm },

  { path: '/empleados', component: EmpleadosView },
  { path: '/empleados/nuevo', component: EmpleadoForm },
  { path: '/empleados/:id', component: EmpleadoDetalle },
  { path: '/empleados/:id/editar', component: EmpleadoForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
