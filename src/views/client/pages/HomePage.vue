<script setup>
import API from "@/api/api-main";
import { onMounted, ref } from "vue";
import ProductsGrid from "../components/ProductsGrid.vue";
import SlidesItem from "../components/SlidesItem.vue";

onMounted(() => {
  fetchAllProducts();
});
const Products = ref([]);
const SectionData = ref([
  {
    title: "",
  },
  {
    title: "Danh mục HOT",
  },
]);
const fetchAllProducts = async () => {
  try {
    const res = await API.get(`products?skip=0&limit=2000`);
    Products.value = res.data.metadata.result;
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <body class="font-montserrat text-sm bg-white dark:bg-zinc-900 flex flex-col gap-5">
    <div class="pb-5">
      <SlidesItem></SlidesItem>
    </div>
    <div class="flex flex-col gap-5">
      <section class="py-10">
        <div class="text-2xl text-center uppercase font-semibold mb-2">
          Sản phẩm bán chạy 2025
        </div>
        <div
          class="flex container mx-auto 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700"
        >
          <ProductsGrid :data="Products"></ProductsGrid>
        </div>
      </section>
      <section class="w-full container mx-auto py-10">
        <div class="text-2xl text-center uppercase font-semibold mb-2">
          Bộ sưu tập 2025
        </div>
        <div class="flex gap-3">
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                src="https://htmldemo.net/shopick-v1/shopick/img/quickview-photo.jpg"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Đồ chơi bé trai</span>
          </router-link>
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                src="https://htmldemo.net/shopick-v1/shopick/img/product/1.jpg"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Đồ chơi bé gái</span>
          </router-link>
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                :src="'https://htmldemo.net/shopick-v1/shopick/img/product/2.jpg'"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Hot Wheels</span>
          </router-link>
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                :src="'https://htmldemo.net/shopick-v1/shopick/img/product/5.jpg'"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Ba lô, Túi</span>
          </router-link>
        </div>
      </section>
      <section class="container mx-auto">
        <div class="text-2xl text-center uppercase font-semibold mb-2">
          Ưu Đãi Độc Quyền Website
        </div>
        <div
          class="flex container mx-auto 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700"
        >
          <div class="w-full container mx-auto">
            <ProductsGrid :data="Products"></ProductsGrid>
          </div>
        </div>
      </section>
      <img
        height="100"
        class="object-cover"
        src="https://htmldemo.net/shopick-v1/shopick/img/slider/slider-1/1.jpg"
        alt=""
      />
    </div>
  </body>
</template>
