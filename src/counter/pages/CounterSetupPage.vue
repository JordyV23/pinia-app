<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useCounterSetupStore } from '../../store/counter-setup';

const counterSetup = useCounterSetupStore();
const { count,squareCount } = storeToRefs(counterSetup);
const {increment,incrementBy} = counterSetup;

</script>

<template>
    <div>
        <h1>Pinia Setup</h1>
        <h4>Counter 2 Page: {{ count }}</h4>
        <h4>Squre: {{ squareCount }}</h4>

        <br>

        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>
        <!-- <button @click="$reset()">Reset</button> -->
    </div>

    <counterOptio/>
</template>

<style scoped>
button{
    margin-right: 5px;
}
</style>