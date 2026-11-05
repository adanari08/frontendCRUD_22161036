<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRol, crearRol, actualizarRol, mensajeError } from '../../services/api'

const route = useRoute()
const router = useRouter()

// Si hay id en la ruta es editar, si no es nuevo
const id = route.params.id

const rol = ref({ name: '', description: '' })
const error = ref('')

onMounted(async () => {
  if (id) {
    try {
      const res = await getRol(id)
      rol.value.name = res.data.data.name
      rol.value.description = res.data.data.description || ''
    } catch (e) {
      error.value = mensajeError(e)
    }
  }
})

async function guardar() {
  const datos = {
    name: rol.value.name,
    description: rol.value.description || null
  }
  try {
    if (id) {
      await actualizarRol(id, datos)
    } else {
      await crearRol(datos)
    }
    router.push('/roles')
  } catch (e) {
    error.value = mensajeError(e)
  }
}
</script>

<template>
  <h2>{{ id ? 'Editar rol' : 'Nuevo rol' }}</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="guardar">
    <label>Nombre</label>
    <input v-model="rol.name" type="text" maxlength="30" required />

    <label>Descripción</label>
    <textarea v-model="rol.description" rows="3"></textarea>

    <button type="submit">Guardar</button>
  </form>

  <p><router-link to="/roles">Cancelar</router-link></p>
</template>
