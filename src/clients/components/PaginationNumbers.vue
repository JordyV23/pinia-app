<script setup lang="ts">
import { toRef, ref, watch } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

//Se utilizan emiciones para que el componente padre sepa que se ha cambiado de página
//Y asi pensar en el crecimiento a futuro del componente
interface Emits {
  (e: "pageChanged", page: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const currentPage = toRef(props, "currentPage");
const totalPages = toRef(props, "totalPages");

const totalPageNumbers = ref<number[]>([]);

watch(
  totalPages,
  () => {
    totalPageNumbers.value = [...new Array(totalPages.value)].map(
      (value, index) => index + 1
    );
  },
  { immediate: true }
); //Indica que inmediatamente que se construya el componente se ejecute la función
</script>

<template>
  <div>
    <button
      :disabled="currentPage === 1"
      @click="emits('pageChanged', currentPage - 1)"
    >
      Anterior
    </button>
    <button
      v-for="number of totalPageNumbers"
      :key="number"
      @click="emits('pageChanged', number)"
      :class="{ active: currentPage === number }"
    >
      {{ number }}
    </button>
    <button
      :disabled="currentPage === totalPages"
      @click="emits('pageChanged', currentPage + 1)"
    >
      Siguiente
    </button>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}

button {
  background: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  margin-right: 5px;
  padding: 10px;
  transform-origin: all 0.5s;
}

button:hover {
  background: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}

button:disabled {
  cursor: not-allowed;
}

.active {
  background: hsla(160, 100%, 37%, 0.2);
}
</style>
