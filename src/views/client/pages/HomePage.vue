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
            <span class="text-xl font-semibold">Bộ sưu tập thu đông</span>
          </router-link>
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                src="https://htmldemo.net/shopick-v1/shopick/img/product/1.jpg"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Bộ sưu tập 2025</span>
          </router-link>
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                :src="'https://htmldemo.net/shopick-v1/shopick/img/product/2.jpg'"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Bộ sưu tập áo choàng</span>
          </router-link>
          <router-link to="#" class="flex flex-col gap-2 text-center">
            <div class="overflow-hidden rounded-lg">
              <img
                width="300"
                :src="'https://htmldemo.net/shopick-v1/shopick/img/product/5.jpg'"
                class="hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
            <span class="text-xl font-semibold">Bộ sưu tập hè 2025</span>
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
        src="https://im.uniqlo.com/global-cms/spa/res2e178bb07e99f0ded143d91555876a90fr.jpg"
        alt=""
      />
    </div>
    <div class="py-5">
      <div class="relative overflow-hidden bg-white">
        <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div class="sm:max-w-lg">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Phong cách mùa hè cuối cùng đã đến
              </h1>
              <p class="mt-4 text-xl text-gray-500">
                Năm nay, bộ sưu tập mùa hè mới của chúng tôi sẽ bảo vệ bạn khỏi những yếu
                tố khắc nghiệt của một thế giới không quan tâm đến sự sống hay cái chết
                của bạn.
              </p>
            </div>
            <div>
              <div class="mt-10">
                <div
                  aria-hidden="true"
                  class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div
                    class="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8"
                  >
                    <div class="flex items-center space-x-6 lg:space-x-8">
                      <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div
                          class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                        >
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                        <div class="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                            alt=""
                            class="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/client/products-list"
                  class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                  >Bộ sưu tập cửa hàng</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
