<script setup lang="ts">
import Point from './shapes/Point.vue';
import { defineProps } from 'vue';

defineProps({
  data: {
    type: Array,
    default: () => []
  },
  scaleX: {
    type: Function,
    default: (x) => x
  },
  scaleY: {
    type: Function,
    default: (x) => x
  },
  size: {
    type: Number,
    default: 2
  }
})
</script>

<template>
  <Point
    v-for="(d, index) in data"
    :key="index"
    :size="size"
    :x="scaleX.scale(d[0])"
    :y="scaleY.scale(d[1])"
  />
</template>
