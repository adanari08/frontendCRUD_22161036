<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUsuario, getRoles, crearUsuario, actualizarUsuario, mensajeError } from '../../services/api'

const route = useRoute()
const router = useRouter()

const id = route.params.id

const usuario = ref({
  username: '',
  email: '',
  password: '',
  role_id: '',
  is_active: true
})
const roles = ref([])
const error = ref('')

onMounted(async () => {
  try {
    // Roles para llenar el select
    const resRoles = await getRoles()
    roles.value = resRoles.data.data

    if (id) {
      const res = await getUsuario(id)
      usuario.value.username = res.data.data.username
      usuario.value.email = res.data.data.email
      usuario.value.role_id = res.data.data.role_id
      usuario.value.is_active = res.data.data.is_active
    }
  } catch (e) {
    error.value = mensajeError(e)
  }
})

async function guardar() {
  const datos = {
    username: usuario.value.username,
    email: usuario.value.email,
    role_id: Number(usuario.value.role_id)
  }

  // Al editar, la contraseña solo se manda si se escribió una nueva
  if (usuario.value.password) {
    datos.password = usuario.value.password
  }

  try {
    if (id) {
      datos.is_active = usuario.value.is_active
      await actualizarUsuario(id, datos)
    } else {
      await crearUsuario(datos)
    }
    router.push('/usuarios')
  } catch (e) {
    error.value = mensajeError(e)
  }
}
</script>

<template>
  <h2>{{ id ? 'Editar usuario' : 'Nuevo usuario' }}</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="guardar">
    <label>Usuario</label>
    <input v-model="usuario.username" type="text" maxlength="30" required />

    <label>Email</label>
    <input v-model="usuario.email" type="email" required />

    <label>Contraseña {{ id ? '(dejar vacía para no cambiarla)' : '' }}</label>
    <input v-model="usuario.password" type="password" minlength="8" :required="!id" />

    <label>Rol</label>
    <select v-model="usuario.role_id" required>
      <option value="" disabled>Selecciona un rol</option>
      <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{ rol.name }}</option>
    </select>

    <label v-if="id">
      <input v-model="usuario.is_active" type="checkbox" /> Activo
    </label>

    <button type="submit">Guardar</button>
  </form>

  <p><router-link to="/usuarios">Cancelar</router-link></p>
</template>
