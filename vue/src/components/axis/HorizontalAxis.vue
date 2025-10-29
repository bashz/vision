<script setup lang="ts">
import Point from './shapes/Point.vue';
import { generateTicks } from '../../../../src/utils/ticks';
import { defineProps, computed } from 'vue';

const props = defineProps({
  scale: {
    type: Object,
    default: (x) => x
  },
  position: {
    type: Number,
    default: 0,
  },
  ticks: {
    type: Array,
    default: [],
  },
  tickSize: {
    type: Number,
    default: 5,
  },
  dx: {
    type: Number,
    default: 0,
  },
  dy: {
    type: Number,
    default: 0,
  },
  textAnchor: {
    type: String,
    default: 'middle',
    validator(value, props) {
      return ['start', 'middle', 'end'].includes(value)
    }
  },
})

const ticks = computed(() => {
  const ticks = props.tickSize.length ? props.ticks : generateTicks(props.scale.domain[0], props.scale.domain[1]);
  return ticks.map((tick, index) => {
    const value = props.scale.scale(tick);
    return {
      index,
      value,
      label: tick,
    }
  })
});
</script>

<template>
  <g>
    <line
      :x1="scale.range[0]"
      :y1="position"
      :x2="scale.range[1]"
      :y2="position"
      stroke="black"
    />
    <g v-for="tick in ticks" :key="tick.index">
      <line
        :x1="tick.value"
        :y1="position"
        :x2="tick.value"
        :y2="position - tickSize"
        stroke="black" 
      />
      <text
        :x="tick.value"
        :y="position"
        :dx="dx"
        :dy="dy"
        :text-anchor="textAnchor"
      >{{ tick.label }}</text>
    </g>
  </g>
</template>
