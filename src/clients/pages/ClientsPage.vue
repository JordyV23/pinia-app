<script setup lang="ts">
//Primero importaciones de Terceros
import { useRoute, useRouter } from "vue-router";
//Luego modulos internos
import useClient from "@/clients/composables/useClient";
import LoadingModal from "@/shared/components/LoadingModal.vue";
import { watch } from "vue";

const route = useRoute(); //Se queda
const router = useRouter(); //Se queda

const {
  client,
  isLoading,
  isError,
  clientMutation,
  isUpdatingClient,
  hasUpdatedSuccess,
} = useClient(+route.params.id);

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();

    router.push("/clients");
  });
});

watch(isError, () => {
  if (isError) {
    router.replace("/clients");
  }
});
</script>

<template>
  <h3 v-if="isUpdatingClient">Guardando...</h3>
  <h3 v-if="hasUpdatedSuccess">Guardado</h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <h2>Informacion del Cliente</h2>
    <form @submit.prevent="clientMutation.mutate(client!)">
      <input type="text" placeholder="Nombre" v-model="client.name" />
      <br />
      <input type="text" placeholder="Direccion" v-model="client.address" />
      <br />
      <input type="text" placeholder="Correo" v-model="client.email" />
      <br />
      <button type="submit" :disabled="clientMutation.isLoading.value">
        Guardar
      </button>
    </form>
  </div>
  <br />
  <code> {{ client }}</code>
</template>

<style scoped>
input {
  width: 100%;
  padding: 10px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 16px;
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
</style>
