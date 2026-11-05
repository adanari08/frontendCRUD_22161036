<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getUsuario, mensajeError } from '../../services/api'

const route = useRoute()
const usuario = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getUsuario(route.params.id)
    usuario.value = res.data.data
  } catch (e) {
    error.value = mensajeError(e)
  }
})
</script>

<template>
  <h2>Detalle del usuario</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <div v-if="usuario">
    <p><b>ID:</b> {{ usuario.id }}</p>
    <p><b>Usuario:</b> {{ usuario.username }}</p>
    <p><b>Email:</b> {{ usuario.email }}</p>
    <p><b>Rol (ID):</b> {{ usuario.role_id }}</p>
    <p><b>Activo:</b> {{ usuario.is_active ? 'Sí' : 'No' }}</p>
    <p><b>Creado:</b> {{ new Date(usuario.created_at).toLocaleString() }}</p>
    <p><b>Actualizado:</b> {{ new Date(usuario.updated_at).toLocaleString() }}</p>
    <router-link :to="'/usuarios/' + usuario.id + '/editar'" class="btn">Editar</router-link>
  </div>

  <p><router-link to="/usuarios">Volver</router-link></p>
</template>
