<script setup lang="ts">
import identity from '../../design/identity.json'

defineProps<{ cierre?: boolean }>()
</script>

<template>
  <div class="marca-pitch" :class="{ 'marca-pitch--cierre': cierre }">
    <div class="marca-pitch-logo">
      <img src="/simbolo-al-curro-claro.svg" alt="" />
      <span>{{ identity.name }}</span>
    </div>
    <p>Tu experiencia no caduca</p>
  </div>
  <span v-if="!cierre" class="marca-pitch-esquina" aria-hidden="true" />
</template>
