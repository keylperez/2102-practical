<template>
  <div class="container p-8 mx-auto mt-12 bg-white text-black">
      <div class="w-full overflow-x-auto">
        <div class="my-2">
          <h3 class="text-xl font-bold tracking-wider">Shopping Cart</h3>
        </div>
        <table class="w-full shadow-inner">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 font-bold whitespace-nowrap">Product</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Price</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
            </tr>
          </thead>
          <tbody>
            
            <CartItem />
            <tr>
              <td class="p-4 px-6 text-center whitespace-nowrap"></td>
              <td class="p-4 px-6 text-center whitespace-nowrap">
                <div class="font-bold">Total Qty - {{cartQuantity}}</div>
              </td>
              <td class="p-4 px-6 font-extrabold text-center whitespace-nowrap">
                Total - {{ total.toLocaleString("en-US", {style: 'currency', currency: 'PHP'}) }}
              </td>
              <td class="p-4 px-6 text-center whitespace-nowrap">
                <button
                  @click="$store.commit('mutateItem', {idParam: 0, quantity: 0, action: 'clear'})"
                  class="px-4 py-1 text-red-600 bg-red-100">
                  Clear
                  All
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-end mt-4 space-x-2 items-center">
          <div class="flex flex-col">
            <div class="flex-1">
              <span>Coupon: </span>
              <input
              @keyup.enter="couponInput"
              v-model="coupon"
              type="text"
              class="border-b border-gray-400">
            </div>
            <p class="flex-1 text-left text-red-500">{{ msg }}</p>
          </div>
          <router-link 
            to="/"
            class="
              px-6
              py-3
              text-sm text-gray-800
              bg-gray-200
              hover:bg-gray-400
            "
          >
            Cancel
          </router-link>
          <router-link
            to="/checkout"
            class="
              px-6
              py-3
              text-sm text-white
              bg-indigo-500
              hover:bg-indigo-600
            "
          >
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
export default {
    name: 'Cart',
    components: {
        CartItem,
    },
    methods: {
      couponInput(){
        if(this.cartTotal === 0) {
          this.msg = 'No items to discount';
          return;
        }
        const coupon = this.coupon;
        switch(coupon){
          case 'menu50':
            this.msg = '50% discount applied!';
            this.discount = .5;
            break;

          case 'menu20':
            this.msg = '20% discount applied!';
            this.discount = .2;
            break;

          case 'menu10':
            this.msg = '10% discount applied!';
            this.discount = .1;
            break;

          case 'mmenu200flat':
            if(this.cartTotal < 1000) return;
            this.msg = '50% discount applied!';
            // this.discount = .05;
            break;

          default:
            this.msg ="Invalid Coupon"
            break;
        }
      },
    },
    computed: {
        cartTotal: function(){
            const cart = this.$store.state.cart;
            let final = 0;
            cart.forEach(e => {
                final += (e.price * e.quantity);
            });
            // console.log(final);
            // return final * discount;
            this.total = final * this.discount;
        },
        cartQuantity(discount){

            const cart = this.$store.state.cart;
            let total = 0;
            cart.forEach(e => {
                total += e.quantity;
            });
            return total;
        },
        getCartLength(){
          return this.$store.state.cart.length;
        }
    },
    mounted(){

    },
    data(){
      return{ 
        msg: '',
        total: 0,
        coupon: '',
        discount: 1
      }
    },
}
</script>

<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>