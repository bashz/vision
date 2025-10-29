<script setup lang="ts">
import Points from './Points.vue';
import CartezianAxis from './axis/CartezianAxis.vue';
import VerticalAxis from './axis/VerticalAxis.vue';
import HorizontalAxis from './axis/HorizontalAxis.vue';
import { Scale } from '../../../src/index'
import { ref, useTemplateRef, onMounted, reactive, onUnmounted } from 'vue'

const svg = useTemplateRef('svg');

const offsets = {
  left: 35,
  bottom: 35,
  right: 15,
  top: 15
}

const xRange = reactive([offsets.left, 800 - offsets.right]);
const yRange = reactive([600 - offsets.bottom, offsets.top]);
const size = ref(5);

const data = reactive([[20, 6], [40, 60], [50, 66], [60, 18], [80, 40]]);

const resizeObserver = new ResizeObserver((entries) => {
  if (svg.value) {
    xRange[1] = parseInt(getComputedStyle(entries[0].target).width) - offsets.right;
    yRange[0] = parseInt(getComputedStyle(entries[0].target).height) - offsets.bottom;
  }
})

onMounted(() => {
  resizeObserver.observe(svg.value);
});

onUnmounted(() => {
  resizeObserver.disconnect();
})

var xScale = ref(new Scale([0, 100], xRange, (n) => n * n, (m) => Math.sqrt(m)));
var yScale = ref(new Scale([0, 100], yRange));
</script>

<template>
  <div class="viz-wrapper">
    <div class="viz-chart">
      <svg class="viz-svg" ref="svg">
        <g class="viz-global">
          <Points
            :data="data"
            :scale-x="xScale"
            :scale-y="yScale"
            :size="size"
          />
          <HorizontalAxis
            :scale="xScale"
            :position="yRange[0]"
            :tick-size="-5"
            :dy="16"
          />
          <VerticalAxis
            :scale="yScale"
            :position="xRange[0]"
            :dx="-6"
            :dy="4"
          />
        </g>
      </svg>
      <div class="viz-legend">
        Legend
      </div>
      <div class="viz-tooltip">
        Tooltip
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.viz-chart,
.viz-svg {
  width: 100%;
  height: 100%;
}
</style>
anthony.bastide@septeo.com
