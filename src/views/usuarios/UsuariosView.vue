<script setup>
import { ref, onMounted } from 'vue'
import { getUsuarios, eliminarUsuario, mensajeError } from '../../services/api'

const usuarios = ref([])
const error = ref('')

async function cargarUsuarios() {
  try {
    const res = await getUsuarios()
    usuarios.value = res.data.data
  } catch (e) {
    error.value = mensajeError(e)
  }
}

async function eliminar(id) {
  if (!confirm('¿Seguro que quieres eliminar este usuario?')) return
  try {
    await eliminarUsuario(id)
    cargarUsuarios()
  } catch (e) {
    error.value = mensajeError(e)
  }
}

onMounted(cargarUsuarios)
</script>

<template>
  <h2>Usuarios</h2>
  <router-link to="/usuarios/nuevo" class="btn">+ Nuevo usuario</router-link>

  <p v-if="error" class="error">{{ error }}</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Email</th>
        <th>Rol (ID)</th>
        <th>Activo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="usuario in usuarios" :key="usuario.id">
        <td>{{ usuario.id }}</td>
        <td>{{ usuario.username }}</td>
        <td>{{ usuario.email }}</td>
        <td>{{ usuario.role_id }}</td>
        <td>{{ usuario.is_active ? 'Sí' : 'No' }}</td>
        <td>
          <router-link :to="'/usuarios/' + usuario.id">Ver</router-link>
          <router-link :to="'/usuarios/' + usuario.id + '/editar'">Editar</router-link>
          <button class="btn-eliminar" @click="eliminar(usuario.id)">Eliminar</button>
        </td>
      </tr>
      <tr v-if="usuarios.length === 0">
        <td colspan="6">No hay usuarios registrados</td>
      </tr>
    </tbody>
  </table>
</template>
