<template>
  <tr v-for="item in $store.state.cart" :key="item.id" class="border-b">
        <td
          class="p-4 px-6 text-center whitespace-nowrap">
          {{
          item.itemObject[0].name
          }}
          <!--
          {{item}}
          -->
          </td>
        <td class="p-4 px-6 text-center whitespace-nowrap">
        <div>
            <button @click="$store.commit('mutateItem', {idParam: item.productID, quantity: item.quantity, action: 'decrement'})" class="px-2 py-0 shadow-2xl">-</button>
            <input
            type="number"
            name="qty"
            v-model="item.quantity"
            min="0"
            :max="item.quantity"
            class="w-12 text-center bg-gray-200 outline-none"
            />
            <button
              @click="$store.commit('mutateItem', {idParam: item.productID, quantity: item.quantity, action: 'increment'})"
              class="px-2 py-0 shadow-2xl ">+</button>
        </div>
        </td>
        <td
          class="p-4 px-6 text-center whitespace-nowrap">{{
          item.price.toLocaleString("en-US",
          {style:
          'currency',
          currency:
          'PHP'})
          }}</td>
          <td
          class="p-4 px-6 text-center whitespace-nowrap">
          <button
          @click="$store.commit('mutateItem', {idParam: item.productID, quantity: item.quantity, action: 'remove'})"
          class="px-2 py-0 text-red-100 bg-red-600 rounded">
            x
        </button>
        </td>
    </tr>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'CartItem',
    computed: {
        getCart(){
            return this.$store.state.cart;
        }, 
    }, 
    mounted() {
        // console.log(this.getCart);
    }
}
</script>1

<style>

</style>