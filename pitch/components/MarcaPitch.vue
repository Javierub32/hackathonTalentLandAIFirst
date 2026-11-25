<script setup lang="ts">
import identity from '../../design/identity.json'
</script>

<template>
  <div class="cierre-grid">
    <div class="marca-pitch">
      <div class="marca-pitch-logo">
        <img src="/simbolo-al-curro-claro.svg" alt="" />
        <span>{{ identity.name }}</span>
      </div>
      <p>Tu experiencia no caduca</p>
    </div>
    <div class="cierre-foto">
      <img src="/pilar.jpg" alt="Pilar, nuestra persona de ejemplo" />
    </div>
  </div>
</template>
