<script setup lang="ts">
import identity from '../../design/identity.json'
</script>

<template>
  <div class="marca-pitch">
    <img src="/logo-al-curro-claro.png" :alt="identity.name" />
    <p>{{ identity.tagline }}</p>
  </div>
</template>
