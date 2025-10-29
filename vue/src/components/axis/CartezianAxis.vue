<script setup lang="ts">
import Point from './shapes/Point.vue';
import { generateTicks } from '../../../../src/utils/ticks';
import { defineProps, computed } from 'vue';

const props = defineProps({
  scale: {
    type: Object,
    default: (x) => x
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator(value, props) {
      return ['vertical', 'horizontal'].includes(value)
    }
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
    default: 'start',
    validator(value, props) {
      return ['start', 'middle', 'end'].includes(value)
    }
  },
})

const axis = computed(() => {
  const coordinates = {
    x1: props.position,
    x2: props.position,
    y1: props.position,
    y2: props.position
  };

  if (props.orientation === 'vertical') {
    coordinates.y1 = props.scale.range[0];
    coordinates.y2 = props.scale.range[1];
  } else {
    coordinates.x1 = props.scale.range[0];
    coordinates.x2 = props.scale.range[1];
  }

  return coordinates;
});

const ticks = computed(() => {
  const ticks = props.tickSize.length ? props.ticks : generateTicks(props.scale.domain[0], props.scale.domain[1]);
  if (props.orientation === 'vertical') {
    return ticks.map((tick, index) => {
      const scaledTick = props.scale.scale(tick);
      return {
        index,
        x: props.position,
        y: scaledTick,
        x1: props.position,
        y1: scaledTick,
        x2: props.position - props.tickSize,
        y2: scaledTick,
        label: tick,
      }
    });
  } else {
    return ticks.map((tick, index) => {
      const scaledTick = props.scale.scale(tick);
      return {
        index,
        x: scaledTick,
        y: props.position,
        x1: scaledTick,
        y1: props.position,
        x2: scaledTick,
        y2: props.position - props.tickSize,
        label: tick,
      }
    })
  }
});
</script>

<template>
  <g>
    <line
      :x1="axis.x1"
      :y1="axis.y1"
      :x2="axis.x2"
      :y2="axis.y2"
      stroke="black"
    />
    <g v-for="tick in ticks" :key="tick.index">
      <line
        :x1="tick.x1"
        :y1="tick.y1"
        :x2="tick.x2"
        :y2="tick.y2"
        stroke="black" 
      />
      <text
        :x="tick.x"
        :y="tick.y"
        :dx="dx"
        :dy="dy"
        :text-anchor="textAnchor"
      >{{ tick.label }}</text>
    </g>
  </g>
</template>