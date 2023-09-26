<script setup lang="ts">
import { useCounterSetupStore } from '../../store/counter-setup';

const counterStore = useCounterSetupStore()

</script>


<template>
  <h1> El valor es {{ counterStore.count }} </h1>
  <h3>Ultimo cambio: {{ counterStore.lastChanged }}</h3>
</template>

<style lang="scss" scoped></style>
