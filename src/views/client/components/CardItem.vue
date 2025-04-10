<template>
  <Card style="overflow: hidden; transition: 0.3s ease-in-out" class="relative">
    <template #header>
      <div class="box-product">
        <router-link :to="`/client/detail/${props.data._id}`">
          <img
            alt="user header"
            crossorigin="anonymous"
            :src="
              props.data.images ? props.data.images[0] : `https://placehold.co/600x400`
            "
          />
        </router-link>

        <div class="absolute bottom-1/2 right-5 action-product hidden">
          <div class="flex flex-col gap-3">
            <Button
              icon="pi pi-cart-plus"
              outlined
              @click="OnclickaddToCart(props.data._id)"
            ></Button>
            <Button icon="pi pi-heart" outlined></Button>
            <Button icon="pi pi-sort-alt" outlined></Button>
          </div>
        </div>
      </div>
    </template>
    <template #title>
      <router-link :to="`/client/detail/${props.data._id}`">
        <div class="flex flex-col gap-2">
          <span class="font-bold">{{ props.data.productName }}</span>
          <span class="text-base line-clamp-2">{{ props.data?.descriptions }} </span>
        </div>
      </router-link>
    </template>

    <template #footer>
      <div class="flex items-center gap-2 mt-1">
        <strong class="text-lg text-secondary line-through" v-if="discount(props.data)"
          >{{ formatPrice(props.data.price) }}đ</strong
        >
        <strong class="text-lg text-primary"
          >{{
            discount(props.data)
              ? formatPrice(props.data.price - discount(props.data))
              : formatPrice(props.data.price)
          }}đ</strong
        >
      </div>
    </template>
  </Card>
</template>

<script setup>
const props = defineProps(["data"]);
import { useCartStore } from "../store/carts";

const { addToCart, discount } = useCartStore();

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const OnclickaddToCart = (id) => {
  addToCart({ productId: id, quantity: 1 });
};
</script>
<style scoped>
.box-product:hover > .action-product {
  display: block !important;
}
</style>
