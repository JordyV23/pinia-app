<script setup lang="ts">
//Primero importaciones de Terceros
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
//Luego modulos internos
import useClient from "@/clients/composables/useClient";
import LoadingModal from "@/shared/components/LoadingModal.vue";
import type { Client } from "@/clients/interfaces/client";
import clientsApi from "@/api/clients-api";
import { watch } from "vue";

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const { client, isLoading, isError } = useClient(+route.params.id);

const updateClient = async (client: Client): Promise<Client> => {
  //Particularidad: Validar que no se pueda modificar el ID es parte del backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...cliente } = client;

  const { data } = await clientsApi.patch(`clients/${client.id}`, cliente);
  const queries = queryClient
    .getQueryCache()
    .findAll(["clients?page="], { exact: false });
  queries.forEach((query) => query.fetch());

  return data;
};

const clientMutation = useMutation(updateClient);

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();
  });
});

watch(isError, () => {
  if(isError){
    router.replace('/clients')
  }
})
</script>

<template>
  <h3 v-if="clientMutation.isLoading.value">Guardando...</h3>
  <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>

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
