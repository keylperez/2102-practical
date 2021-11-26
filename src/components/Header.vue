<template>
  
  <header class=" p-5 bg-yellow-400 shadow-xl grid grid-cols-5 h-24 text-gray-900">
    <div class="justify-items-start">
      <router-link class="text-5xl text-left" to="/"><p>Calabana Market</p>
      </router-link> 
    </div>
    <div class="col-start-5 col-end-6 justify-items-end text-2xl items-center text-right">
      <router-link class="text-right" to="/cart">
        Cart
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
  }
}
</script>

<style scoped>
  .icon{
    width: 30px;
    height: 30px;
    fill: rgb(236, 93, 93);
  }
</style>