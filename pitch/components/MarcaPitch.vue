<script setup lang="ts">
import identity from '../../design/identity.json'
</script>

<template>
  <div class="marca-pitch">
    <div class="marca-pitch-logo">
      <img src="/simbolo-al-curro-claro.svg" alt="" />
      <span>{{ identity.name }}</span>
    </div>
    <p>Tu experiencia no caduca</p>
  </div>
  <span class="marca-pitch-esquina" aria-hidden="true" />
</template>
