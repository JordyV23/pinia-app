<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useCounterOptionsStore } from '../../store/counter-options';
const counterOption = useCounterOptionsStore();

const { count,squareCounte } = storeToRefs(counterOption);
const {increment,incrementBy,$reset} = counterOption;

</script>

<template>
    <div>
        <h1>Pinia Options</h1>
        <h4>Counter 1 Page: {{ count }}</h4>
        <h4>Squre: {{ squareCounte }}</h4>

        <br>

        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>
        <button @click="$reset()">Reset</button>
    </div>

    <counterOptio/>
</template>

<style scoped>
button{
    margin-right: 5px;
}
</style>