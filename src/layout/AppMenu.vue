<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Admin",
    items: [
      { label: "Trang chủ", icon: "pi pi-fw pi-home", to: "/" },
      { label: "Sản phẩm", icon: "pi pi-fw pi-images", to: "/man/products" },
      { label: "Đơn hàng", icon: "pi pi-fw pi-file", to: "/man/invoice" },
      { label: "Banner", icon: "pi pi-fw pi-images", to: "/man/banners" },
      { label: "Coupon", icon: "pi pi-fw pi-ticket", to: "/man/coupon" },
      { label: "Thương hiệu", icon: "pi pi-fw pi-video", to: "/man/brands" },
      { label: "Thể loại", icon: "pi pi-fw pi-map", to: "/man/genres" },
    ],
  },

  {
    label: "Trang client",
    icon: "pi pi-fw pi-briefcase",
    to: "/pages",
    items: [
      {
        label: "Website",
        icon: "pi pi-fw pi-globe",
        to: "/client",
      },
    ],
  },
  // {
  //     label: 'Hierarchy',
  //     items: [
  //         {
  //             label: 'Submenu 1',
  //             icon: 'pi pi-fw pi-bookmark',
  //             items: [
  //                 {
  //                     label: 'Submenu 1.1',
  //                     icon: 'pi pi-fw pi-bookmark',
  //                     items: [
  //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
  //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
  //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
  //                     ]
  //                 },
  //                 {
  //                     label: 'Submenu 1.2',
  //                     icon: 'pi pi-fw pi-bookmark',
  //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
  //                 }
  //             ]
  //         },
  //         {
  //             label: 'Submenu 2',
  //             icon: 'pi pi-fw pi-bookmark',
  //             items: [
  //                 {
  //                     label: 'Submenu 2.1',
  //                     icon: 'pi pi-fw pi-bookmark',
  //                     items: [
  //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
  //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
  //                     ]
  //                 },
  //                 {
  //                     label: 'Submenu 2.2',
  //                     icon: 'pi pi-fw pi-bookmark',
  //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
  //                 }
  //             ]
  //         }
  //     ]
  // }
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
