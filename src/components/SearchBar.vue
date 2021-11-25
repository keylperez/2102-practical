<template>
    <div class="my-5 mx-10 col-span-full flex justify-start">
        <input @input="commitInput" :value="searchValue" type="text" autofocus placeholder="Item or category" class="text-white bg-opacity-0 bg-gray-900 outline-none py-1 transition-all w-96 text-xl border-b-2 border-gray-500 shadow-inner">
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    computed: {
        get(){
            return this.$state.searchQuery;
        }
    },
    methods: {
        
        commitInput(searchInput){
            this.$store.commit('getSearchInput', searchInput.target.value);
        }
    }
}
</script>

<style>

</style>