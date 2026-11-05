<script setup>
import { ref, onMounted } from 'vue'
import { getRoles, eliminarRol, mensajeError } from '../../services/api'

const roles = ref([])
const error = ref('')

async function cargarRoles() {
  try {
    const res = await getRoles()
    roles.value = res.data.data
  } catch (e) {
    error.value = mensajeError(e)
  }
}

async function eliminar(id) {
  if (!confirm('¿Seguro que quieres eliminar este rol?')) return
  try {
    await eliminarRol(id)
    cargarRoles()
  } catch (e) {
    error.value = mensajeError(e)
  }
}

onMounted(cargarRoles)
</script>

<template>
  <h2>Roles</h2>
  <router-link to="/roles/nuevo" class="btn">+ Nuevo rol</router-link>

  <p v-if="error" class="error">{{ error }}</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rol in roles" :key="rol.id">
        <td>{{ rol.id }}</td>
        <td>{{ rol.name }}</td>
        <td>{{ rol.description }}</td>
        <td>
          <router-link :to="'/roles/' + rol.id">Ver</router-link>
          <router-link :to="'/roles/' + rol.id + '/editar'">Editar</router-link>
          <button class="btn-eliminar" @click="eliminar(rol.id)">Eliminar</button>
        </td>
      </tr>
      <tr v-if="roles.length === 0">
        <td colspan="4">No hay roles registrados</td>
      </tr>
    </tbody>
  </table>
</template>
