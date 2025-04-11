<template>
  <div>
    <Button
      class="whitespace-nowrap"
      @click="openModal"
      :text="!isScrolled"
      :label="`Giỏ hàng (${getCartItems()?.length || 0})`"
      icon="pi pi-shopping-cart"
    ></Button>

    <Drawer v-model:visible="cartModal" position="right" style="width: 20%">
      <template #header>
        <div class="flex items-center gap-2">
          <Button icon="pi pi-shopping-cart" text></Button>
          <span class="font-bold">Giỏ hàng</span>
        </div>
      </template>

      <ScrollPanel
        v-for="(item, index) in itemInCart.items"
        :key="index"
        style="width: 100%"
        class="flex flex-col"
      >
        <div class="grid items-center grid-cols-12 p-3 m-0">
          <div class="col-span-2">
            <Image
              :src="item.images ? item.images[0] : ``"
              alt="Image"
              width="150"
              preview
            ></Image>
          </div>
          <div class="col-span-8 flex flex-col">
            <strong>{{ item.productName }}</strong>
            <div class="flex items-center justify-between gap-3">
              <div>
                <InputNumber
                  v-model="item.quantity"
                  :min="1"
                  class="cart-number"
                  @blur="onQuantityChange($event, item)"
                ></InputNumber>
                x
                <strong>{{
                  discount(item)
                    ? formatPrice(item.price - discount(item))
                    : formatPrice(item.price)
                }}</strong
                >đ
              </div>
            </div>
          </div>
          <div class="col-span-2 flex justify-end">
            <Button
              @click="RemoveItem(item.productId)"
              icon="pi pi-times"
              size="small"
              text
              severity="danger"
            ></Button>
          </div>
        </div>
        <hr />
      </ScrollPanel>
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <span
            >Tổng cộng
            <strong>{{ formatPrice(totalCartValue.finalPrice) }}đ</strong></span
          >
          <Button @click="directPayment" label="Thanh toán"></Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
<script setup>
import API from "@/api/api-main";
import { useToast } from "primevue/usetoast";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../store/carts";

const { proxy } = getCurrentInstance();
const toast = useToast();
const cartModal = ref(false);
const { getItem, removeItem, discount, updateCart, getCartItems } = useCartStore();
const props = defineProps(["isScrolled"]);
const router = useRouter();
const totalCartValue = ref();

onMounted(async () => {
  fetchItem();
  totalCartValue.value = await getItem();
});

const itemInCart = ref([]);
const openModal = async () => {
  await fetchItem();
  cartModal.value = true;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US").format(price);
};
const RemoveItem = async (id) => {
  let data = {
    productId: id,
  };
  const res = await removeItem(data);
  if (res) {
    fetchItem();
  }
};
const fetchItem = async () => {
  try {
    const res = await API.get(`cart`);
    if (res.status === 401) {
      return router.push(`/auth/login`);
    }
    itemInCart.value = res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};
const onQuantityChange = async (e, data) => {
  let payload = {
    productId: data.productId,
    quantity: e.value,
  };
  const res = await updateCart(payload);
  totalCartValue.value = res.data.metadata;
};

const directPayment = () => {
  if (getCartItems()?.length > 0) {
    cartModal.value = false;
    router.push("/client/payment");
    return;
  }
  return proxy.$notify("W", "Không có sản phẩm trong giỏ hàng!", toast);
};
</script>
<style>
.cart-number {
  width: 40px;
}
.cart-number > input {
  width: 100% !important;
  text-align: center;
}
</style>
