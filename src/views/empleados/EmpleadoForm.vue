<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEmpleado, getUsuarios, crearEmpleado, actualizarEmpleado, mensajeError } from '../../services/api'

const route = useRoute()
const router = useRouter()

const id = route.params.id

const empleado = ref({
  user_id: '',
  first_name: '',
  last_name: '',
  phone: '',
  address: '',
  job_title: '',
  hired_at: '',
  is_active: true
})
const usuarios = ref([])
const error = ref('')

onMounted(async () => {
  try {
    // Usuarios para llenar el select
    const resUsuarios = await getUsuarios()
    usuarios.value = resUsuarios.data.data

    if (id) {
      const res = await getEmpleado(id)
      const e = res.data.data
      empleado.value.user_id = e.user_id
      empleado.value.first_name = e.first_name
      empleado.value.last_name = e.last_name
      empleado.value.phone = e.phone || ''
      empleado.value.address = e.address || ''
      empleado.value.job_title = e.job_title || ''
      empleado.value.hired_at = e.hired_at ? e.hired_at.slice(0, 10) : ''
      empleado.value.is_active = e.is_active
    }
  } catch (e) {
    error.value = mensajeError(e)
  }
})

async function guardar() {
  // Los campos opcionales vacíos se mandan como null
  const datos = {
    user_id: empleado.value.user_id,
    first_name: empleado.value.first_name,
    last_name: empleado.value.last_name,
    phone: empleado.value.phone || null,
    address: empleado.value.address || null,
    job_title: empleado.value.job_title || null
  }

  // Si no se pone fecha, el backend usa la fecha de hoy
  if (empleado.value.hired_at) {
    datos.hired_at = empleado.value.hired_at
  }

  try {
    if (id) {
      datos.is_active = empleado.value.is_active
      await actualizarEmpleado(id, datos)
    } else {
      await crearEmpleado(datos)
    }
    router.push('/empleados')
  } catch (e) {
    error.value = mensajeError(e)
  }
}
</script>

<template>
  <h2>{{ id ? 'Editar empleado' : 'Nuevo empleado' }}</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="guardar">
    <label>Usuario</label>
    <select v-model="empleado.user_id" required>
      <option value="" disabled>Selecciona un usuario</option>
      <option v-for="u in usuarios" :key="u.id" :value="u.id">{{ u.username }}</option>
    </select>

    <label>Nombre</label>
    <input v-model="empleado.first_name" type="text" maxlength="100" required />

    <label>Apellidos</label>
    <input v-model="empleado.last_name" type="text" maxlength="100" required />

    <label>Puesto</label>
    <input v-model="empleado.job_title" type="text" maxlength="60" />

    <label>Teléfono</label>
    <input v-model="empleado.phone" type="text" maxlength="20" />

    <label>Dirección</label>
    <textarea v-model="empleado.address" rows="2"></textarea>

    <label>Fecha de contratación</label>
    <input v-model="empleado.hired_at" type="date" />

    <label v-if="id">
      <input v-model="empleado.is_active" type="checkbox" /> Activo
    </label>

    <button type="submit">Guardar</button>
  </form>

  <p><router-link to="/empleados">Cancelar</router-link></p>
</template>
