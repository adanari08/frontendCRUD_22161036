<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRol, mensajeError } from '../../services/api'

const route = useRoute()
const rol = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getRol(route.params.id)
    rol.value = res.data.data
  } catch (e) {
    error.value = mensajeError(e)
  }
})
</script>

<template>
  <h2>Detalle del rol</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <div v-if="rol">
    <p><b>ID:</b> {{ rol.id }}</p>
    <p><b>Nombre:</b> {{ rol.name }}</p>
    <p><b>Descripción:</b> {{ rol.description }}</p>
    <router-link :to="'/roles/' + rol.id + '/editar'" class="btn">Editar</router-link>
  </div>

  <p><router-link to="/roles">Volver</router-link></p>
</template>
