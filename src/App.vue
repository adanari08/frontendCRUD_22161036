<template>
  <nav class="menu">
    <span class="titulo">CRUD Vue</span>
    <router-link to="/">Inicio</router-link>
    <router-link to="/roles">Roles</router-link>
    <router-link to="/usuarios">Usuarios</router-link>
    <router-link to="/empleados">Empleados</router-link>
  </nav>

  <div class="contenido">
    <router-view :key="$route.fullPath" />
  </div>
</template>
