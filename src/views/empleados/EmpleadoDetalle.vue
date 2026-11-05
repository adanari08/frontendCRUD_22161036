<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getEmpleado, mensajeError } from '../../services/api'

const route = useRoute()
const empleado = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getEmpleado(route.params.id)
    empleado.value = res.data.data
  } catch (e) {
    error.value = mensajeError(e)
  }
})
</script>

<template>
  <h2>Detalle del empleado</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <div v-if="empleado">
    <p><b>ID:</b> {{ empleado.id }}</p>
    <p><b>Nombre:</b> {{ empleado.first_name }} {{ empleado.last_name }}</p>
    <p><b>Puesto:</b> {{ empleado.job_title }}</p>
    <p><b>Teléfono:</b> {{ empleado.phone }}</p>
    <p><b>Dirección:</b> {{ empleado.address }}</p>
    <p><b>Fecha de contratación:</b> {{ empleado.hired_at ? empleado.hired_at.slice(0, 10) : '' }}</p>
    <p><b>Usuario (ID):</b> {{ empleado.user_id }}</p>
    <p><b>Activo:</b> {{ empleado.is_active ? 'Sí' : 'No' }}</p>
    <router-link :to="'/empleados/' + empleado.id + '/editar'" class="btn">Editar</router-link>
  </div>

  <p><router-link to="/empleados">Volver</router-link></p>
</template>
