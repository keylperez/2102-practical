<template>
  <div class="container p-8 mx-auto mt-12 bg-white text-black">
      <div class="w-full overflow-x-auto">
        <div class="my-2">
          <h3 class="text-xl font-bold tracking-wider">Shopping Cart</h3>
        </div>
        <table class="w-full shadow-inner">
          <thead>
            <tr class="bg-gray-700 text-white">
              <th class="px-6 py-3 font-bold whitespace-nowrap">Product</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Price</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
            </tr>
          </thead>
          <tbody>
            
            <CartItem />
            <tr>
              <td class="p-4 px-6 font-extrabold text-center whitespace-nowrap">
                <p v-if="usedCoupon === true" >
                Discounted Price: {{ discounted.toLocaleString("en-US", {style: 'currency', currency: 'PHP'}) }}
                </p>
              </td>
              <td class="p-4 px-6 text-center whitespace-nowrap">
                <div class="font-bold">Total Qty - {{cartQuantity}}</div>
              </td>
              <td class="p-4 px-6 font-extrabold text-center whitespace-nowrap">
                Total - {{ cartTotal.toLocaleString("en-US", {style: 'currency', currency: 'PHP'}) }}
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
          <div class="flex flex-1 flex-col text-left px-6">
            <div class="flex flex-1 ">
              <span class="flex-1">Coupon: </span>
              <input
              @keyup.enter="couponInput"
              v-model="coupon"
              type="text"
              class="flex-2 border-b border-gray-400">
            </div>
            <div class="flex flex-1">
              <span class="flex-1">Cash: </span>
              <input
              @input="cashInput"
              v-model="cash"
              min="0"
              type="number"
              class="flex-2 border-b border-gray-400">
            </div>
          </div>
          <div class="flex flex-col flex-2 h-full">
            <p class="flex-1 text-left text-red-500 h-full">{{ msg }}</p>
            <p class="flex-1 text-left text-red-500 h-full">Change: {{ change.toLocaleString("en-US", {style: 'currency', currency: 'PHP'}) }}</p>
          </div>
          <router-link 
            to="/"
            class="
              px-6
              py-3
              text-sm text-gray-800
              bg-gray-200
              hover:bg-gray-400
              flex-1
            "
          >
            Cancel
          </router-link>
          <button
            @click="checkout"
            class="
              px-6
              py-3
              text-sm text-white
              bg-indigo-500
              hover:bg-indigo-600
              flex-1
            "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
export default {
    name: 'Cart',
    data(){
      return{ 
        msg: '',
        coupon: '',
        discount: 1,
        cash: 0, 
        change: -1,
        usedCoupon: false,
      }
    },
    components: {
        CartItem,
    },
    methods: {
      couponInput(){
        if(this.usedCoupon){ 
          this.msg = "You already used a coupon";
          return;
        }
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
            return;
            break;
        }
        this.usedCoupon = true;
      },
      cashInput(){
        if(final < 0){
          this.msg = 'Please input a positive amount';
          return;
        }
        if(final <= this.discounted){
          this.msg = `Please input amount equal to or above ${discounted.toLocaleString("en-US", {style: 'currency', currency: 'PHP'})}`
          return;
        }
        const final = (this.cash - this.discounted);
        this.change = final;
      },
      checkout(){
        console.log(this.change);
        console.log(this.$store.state.cart.length);
        if(this.change < 0 && this.$store.state.cart.length > 0) {
          alert("Please input valid amount");
          return;
        }
        if(this.$store.state.cart.length <= 0) {
          alert("No items to checkout");
          return;
        }
        this.$store.state.cart = [];
        this.$router.push('/checkout');
      }
    },
    computed: {
        cartTotal: function(){
            const cart = this.$store.state.cart;
            let final = 0;
            cart.forEach(e => {
                final += e.price;
            console.log(e);
            });
            return final;
        },
        discounted: function(){
          return this.cartTotal *this.discount;
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
        },
    },
    mounted(){

    },
}
</script>

<style scoped>

.flex-3{
  flex: 3;
}
</style>