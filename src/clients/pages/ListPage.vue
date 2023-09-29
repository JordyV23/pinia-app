
<script setup lang="ts">
import ClientsList from '@/clients/components/ClientsList.vue';
import PaginationNumbers from '../components/PaginationNumbers.vue';


</script>

<template>
    <div>
        <h1>Listado de Clients</h1>

        <!-- Clinet List -->
        <ClientsList/>

        <!-- Pagination Numbers -->
        <PaginationNumbers/>

        <!-- Loading Modal -->

        
    </div>
</template>

<style scoped>

</style>