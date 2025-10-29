<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import animate, { cubicBezier } from '../../../../src/animation/';

const props = defineProps<{
  x: {
    type: Number,
    default: 0
  },
  y:  {
    type: Number,
    default: 0
  },
  size:  {
    type: Number,
    default: 2
  }
}>()

const anim = cubicBezier(1, 0.5, 0.5, 0.75);

const circle = reactive({...props});

watch(() => props.x, (newCircle, oldCircle) => {
  animate(oldCircle, newCircle, 2000, 0, anim, (v) => {
    circle.x = v;
  });
});

watch(() => props.y, (newCircle, oldCircle) => {
  animate(oldCircle, newCircle, 2000, 0, anim, (v) => {
    circle.y = v;
  });
});

watch(() => props.size, (newCircle, oldCircle) => {
  animate(oldCircle, newCircle, 2000, 0, anim, (v) => {
    circle.size = v;
  });
});
</script>

<template>
  <circle
    :cx="circle.x"
    :cy="circle.y"
    :r="circle.size"
  />
</template>
