<script setup>
import { ref, onMounted } from 'vue'
import { getEmpleados, eliminarEmpleado, mensajeError } from '../../services/api'

const empleados = ref([])
const error = ref('')

async function cargarEmpleados() {
  try {
    const res = await getEmpleados()
    empleados.value = res.data.data
  } catch (e) {
    error.value = mensajeError(e)
  }
}

async function eliminar(id) {
  if (!confirm('¿Seguro que quieres eliminar este empleado?')) return
  try {
    await eliminarEmpleado(id)
    cargarEmpleados()
  } catch (e) {
    error.value = mensajeError(e)
  }
}

onMounted(cargarEmpleados)
</script>

<template>
  <h2>Empleados</h2>
  <router-link to="/empleados/nuevo" class="btn">+ Nuevo empleado</router-link>

  <p v-if="error" class="error">{{ error }}</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Puesto</th>
        <th>Teléfono</th>
        <th>Usuario (ID)</th>
        <th>Activo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="empleado in empleados" :key="empleado.id">
        <td>{{ empleado.id }}</td>
        <td>{{ empleado.first_name }} {{ empleado.last_name }}</td>
        <td>{{ empleado.job_title }}</td>
        <td>{{ empleado.phone }}</td>
        <td>{{ empleado.user_id }}</td>
        <td>{{ empleado.is_active ? 'Sí' : 'No' }}</td>
        <td>
          <router-link :to="'/empleados/' + empleado.id">Ver</router-link>
          <router-link :to="'/empleados/' + empleado.id + '/editar'">Editar</router-link>
          <button class="btn-eliminar" @click="eliminar(empleado.id)">Eliminar</button>
        </td>
      </tr>
      <tr v-if="empleados.length === 0">
        <td colspan="7">No hay empleados registrados</td>
      </tr>
    </tbody>
  </table>
</template>
