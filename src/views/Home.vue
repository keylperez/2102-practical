<template>
  <div class="home">
    <!-- <SearchBar /> -->
    <div class="h-10">{{$store.state.searchQuery}}</div>
    <CardContainers />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue';
import CardContainers from '@/components/CardContainers.vue';

export default {
  name: 'Home',
  components: {
    // SearchBar,
    CardContainers
  }
}
</script>