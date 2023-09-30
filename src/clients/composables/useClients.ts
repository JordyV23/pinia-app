import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";

const getClients = async (page: number): Promise<Client[]> => {
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve(true), 1500);
  // });

  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
  return data;
};

const useClients = () => {
  const store = useClientsStore();
  const { currentPage, clients, totalPages } = storeToRefs(store);

  const { isLoading, data } = useQuery(["clients?page=", currentPage], () =>
    getClients(currentPage.value)
  );

  watch(data, (clients) => {
    if (clients) {
      store.setClients(clients);
    }
  });

  return {
    //Properties
    clients,
    currentPage,
    isLoading,
    totalPages,

    //Methods
    getPage(page: number) {
      store.setPage(page);
    },

    //Getters
    totalPageNumners: computed(() =>
      [...new Array(totalPages.value)].map((value, index) => index + 1)
    ),
  };
};

export default useClients;
