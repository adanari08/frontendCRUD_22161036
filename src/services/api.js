import axios from 'axios'

// La URL de la API se toma del archivo .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Roles
export const getRoles = () => api.get('/roles')
export const getRol = (id) => api.get(`/roles/${id}`)
export const crearRol = (datos) => api.post('/roles', datos)
export const actualizarRol = (id, datos) => api.put(`/roles/${id}`, datos)
export const eliminarRol = (id) => api.delete(`/roles/${id}`)

// Usuarios
export const getUsuarios = () => api.get('/usuarios')
export const getUsuario = (id) => api.get(`/usuarios/${id}`)
export const crearUsuario = (datos) => api.post('/usuarios', datos)
export const actualizarUsuario = (id, datos) => api.put(`/usuarios/${id}`, datos)
export const eliminarUsuario = (id) => api.delete(`/usuarios/${id}`)

// Empleados
export const getEmpleados = () => api.get('/employees')
export const getEmpleado = (id) => api.get(`/employees/${id}`)
export const crearEmpleado = (datos) => api.post('/employees', datos)
export const actualizarEmpleado = (id, datos) => api.put(`/employees/${id}`, datos)
export const eliminarEmpleado = (id) => api.delete(`/employees/${id}`)

// Obtiene el mensaje de error que manda el backend
export function mensajeError(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message
  }
  return 'No se pudo conectar con el servidor'
}
