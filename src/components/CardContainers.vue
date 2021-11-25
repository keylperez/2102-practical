<template>
  <div class="flex mx-40 items-stretch item-container flex-nowrap justify-center shadow-2xl">
      <div v-for="item in items" :key="item.id" class="transition-all duration-200 z-10 transform hover:scale-125 hover:shadow-2xl flex-1 hover:cursor-pointer">
          <div class="flex flex-col text-3xl h-full bg-yellow-200 border-white border text-gray-900">
            <div>
                <img v-bind:src="item.img" alt="" class="h-80 object-cover">
            </div>
            <div class="mt-5 mb-3">
                <div><p>{{item.name}}</p></div>
                <div><p class="text-sm text-gray-500">₱ {{item.price}}</p></div>
            </div>
            <router-link :to="{name: 'Item', params: { name: item.name } }" >
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" enable-background="new 0 0 512 512" xml:space="preserve"><g><polygon points="406,406 106,406 106,106 256,106 256,68.5 68.5,68.5 68.5,443.5 443.5,443.5 443.5,256 406,256  "/><polygon points="293.5,68.5 347.5,122.5 241.2,228.8 283.2,270.8 389.5,164.5 443.5,218.5 443.5,68.5  "/></g></svg>
            </router-link>
            <!-- <pre>
                {{item}}
            </pre> -->
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'CardContainers',
    data(){
        return{
            
        }
    },
    computed: {
        items: function(){
            return this.$store.state.storeItems.filter(e => e.quantity !== 0);
        }
    },
    methods: {
    },
    mounted(){
        // console.log(this.items);
    }
}
</script>

<style scoped>
    .transform:hover{
        z-index: 40 !important;
    }
    .icon{
        opacity: 0;
        width: 32px;
        height: 32px;
        @apply absolute right-1 top-1 transition-all duration-500;
        fill: #514e44;
        /* visibility: hidden; */
    }
    .transform:hover .icon{
        /* visibility: visible; */
        opacity: 1;
    }
    
</style>