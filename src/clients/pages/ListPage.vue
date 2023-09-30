
<script setup lang="ts">
import ClientsList from '@/clients/components/ClientsList.vue';
import PaginationNumbers from '../components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const {isLoading} = useClients();

</script>

<template>
    <div>
        <h1>Listado de Clients</h1>

        <!-- Clinet List -->
        <ClientsList/>

        <!-- Pagination Numbers -->
        <PaginationNumbers/>

        <!-- Loading Modal -->
        <LoadingModal v-if="isLoading" />
        
    </div>
</template>

<style scoped>

</style>