import { useQuery, useMutation } from "@tanstack/vue-query";
import { computed, ref, watch } from "vue";
import type { Client } from "../interfaces/client";
import clientsApi from "@/api/clients-api";

const getClient = async (id: number): Promise<Client> => {
  const { data } = await clientsApi.get(`/clients/${id}`);
  return data;
};

//Se nueve
const updateClient = async (client: Client): Promise<Client> => {
  //Particularidad: Validar que no se pueda modificar el ID es parte del backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...cliente } = client;
  const { data } = await clientsApi.patch(`clients/${client.id}`, cliente);
  return data;
};

const useClient = (id: number) => {
  const client = ref<Client>();

  //Se mueve
  const clientMutation = useMutation(updateClient);

  const { isLoading, data, isError } = useQuery(
    ["client", id],
    () => getClient(id),
    { retry: false }
  );

  watch(
    data,
    () => {
      if (data.value) {
        client.value = { ...data.value };
      }
    },
    { immediate: true }
  );

  return {
    isLoading,
    client,
    isError,
    clientMutation,

    //Metodos
    hasUpdatingError: computed(() => clientMutation.isError),
    isUpdatingClient: computed(() => clientMutation.isLoading.value),
    hasUpdatedSuccess: computed(() => clientMutation.isSuccess.value)
  };
};

export default useClient;
