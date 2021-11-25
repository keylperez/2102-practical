<template>
  <!-- <div v-bind:style="{backgroundImage: `url(${fetchItem.img})`}" class="bg-no-repeat w-full bg-cover h-full"> -->
  <div class="w-full h-full">
    <div class="flex m-20 items-stretch">
      <div class="w-5/12 flex border border-white bg-yellow-200 rounded-3xl overflow-hidden flex-2">
        <img :src="fetchItem.img" alt="" class="w-96 flex-1 object-cover">
        <div class="flex text-gray-900 p-5 border border-white flex-2">
          <div class="flex flex-col text-left ml-5 text-5xl items-stretch flex-1">
            <div class="flex-2 flex flex-col items-stretch">
              <h1 class="flex-1 text-6xl">{{fetchItem.name}}</h1>
              <h1 class="flex-1 text-red-500">{{fetchItem.price.toLocaleString("en-US", {style: 'currency', currency: 'PHP'})}}</h1>
            </div>
            <div class="flex-1 flex flex-col text-3xl items-stretch">
              <h1 class="">Stock: {{fetchItem.quantity}}</h1>
              <h1 class="">Categories: <span v-for="category in categories" :key="category.name" class="rounded-2xl bg-gray-500 px-2 inline-block text-xl align-start my-2 ml-2 text-white">{{category}}</span></h1>
            </div>
          </div>
        </div>
      </div>
      <div class="flex rounded-3xl bg-gray-200 text-gray-900 w-full ml-10 p-5 border border-white flex-1">
        <div class="flex flex-1 items-stretch flex-col px-5 text-2xl">
          <div class="flex flex-1">
            <h1 class="text-5xl mb-3">Order details</h1>
          </div>
          <div class="flex mb-3">
            <div class="text-left flex flex-1">
              <span class="justify-start">Quantity: <input type="number" min="0" v-model.number="quantity" class="w-10 text-center bg-gray-300 text-gray-900 justify-end flex-1"></span>
            </div>
          </div>
          <div class="flex-1 text-left">
            <p>Tota: {{total.toLocaleString("en-US", {style: 'currency', currency: 'PHP'})}}0</p>
          </div>
          <div class="flex flex-1">
            <button @click="quantityEdit('minus')" class="flex-1 text-4xl text-white bg-gray-900 mr-2 my-2">-</button>
            <button @click="quantityEdit('plus')" class="flex-1 text-5xl text-white bg-gray-900 ml-2 my-2">+</button>
          </div>
          <div class="w-full bg-green-600 border-gray-900 border p-5 hover:cursor-pointer">
            <button 
            @click="$store.commit('addToCart', {
              itemID, quantity, total
              })"
              clas="w-full">
              <p class="text-3xl text-white">Add to Cart</p>
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data(){
    return {
      // categItem: this.fetchItem.category
      // fetchItem: this.$route.params.name
      // fetchItem: this.$route.params,
      quantity: 0,
      total: 0
    }
  },
  methods: {
    quantityEdit(iteration){
      if(iteration === 'minus') {
        if(this.quantity !== 0){ 
          this.quantity--;
          this.total -= this.fetchItem.price;
        } else{
          this.quantity = 0;
        }
      }
      if(iteration === 'plus') {
        this.quantity++;
        this.total += this.fetchItem.price;
      }
    }
  },
  computed: {
    fetchItem: function (){
      const object = this.$store.state.storeItems.filter(item => {
        if(this.$route.params.name === item.name) return item;
      })
      return object[0];
    },
    categories: function(){
        // return new Set(this.fetchItem.flatMap(el=>category));
        return this.fetchItem.category;
    },
    itemID: function(){
      return this.fetchItem.id;
    }
  },
  mounted() {
    // console.log(this.$route.params);
    // console.log(this.fetchItem.category[0]);
    // console.log(new Set(this.fetchItem[0].flatMap(el=>el.category)));
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>