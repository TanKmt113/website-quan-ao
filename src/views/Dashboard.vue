<script setup>
import API from "@/api/api-main";
import { formatPrice } from "@/helper/formatPrice";
import { useLayout } from "@/layout/composables/layout";
import { ProductService } from "@/service/ProductService";
import { onMounted, ref, watch } from "vue";

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);
const dataDashboard = ref({});

const items = ref([
  { label: "Add New", icon: "pi pi-fw pi-plus" },
  { label: "Remove", icon: "pi pi-fw pi-trash" },
]);

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data));
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  getReport();
});

const getReport = async () => {
  const response = await API.get("dashboard");
  dataDashboard.value = response?.data.metadata;
};

function setChartData() {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        type: "bar",
        label: "Subscriptions",
        backgroundColor: documentStyle.getPropertyValue("--p-primary-400"),
        data: [4000, 10000, 15000, 4000],
        barThickness: 32,
      },
      {
        type: "bar",
        label: "Advertising",
        backgroundColor: documentStyle.getPropertyValue("--p-primary-300"),
        data: [2100, 8400, 2400, 7500],
        barThickness: 32,
      },
      {
        type: "bar",
        label: "Affiliate",
        backgroundColor: documentStyle.getPropertyValue("--p-primary-200"),
        data: [4100, 5200, 3400, 7400],
        borderRadius: {
          topLeft: 8,
          topRight: 8,
        },
        borderSkipped: true,
        barThickness: 32,
      },
    ],
  };
}

function setChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement);
  const borderColor = documentStyle.getPropertyValue("--surface-border");
  const textMutedColor = documentStyle.getPropertyValue("--text-color-secondary");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textMutedColor,
        },
        grid: {
          color: "transparent",
          borderColor: "transparent",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textMutedColor,
        },
        grid: {
          color: borderColor,
          borderColor: "transparent",
          drawTicks: false,
        },
      },
    },
  };
}

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

watch([getPrimary, getSurface, isDarkTheme], () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Đơn hàng</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              {{ formatPrice(dataDashboard.orderCount || 0) }}
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">24 đơn mới</span>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Doanh thu</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              {{ formatPrice(dataDashboard.totalPriceOfOrder || 0) }} đ
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-dollar text-orange-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">%52+ </span>
        <span class="text-muted-color">trong tuần</span>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Khách hàng</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              28441
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-cyan-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">520 </span>
        <span class="text-muted-color">mới đăng ký</span>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Sản phẩm</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              {{ dataDashboard.productCount }}
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-purple-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">2 </span>
        <span class="text-muted-color">Sản phẩm mới</span>
      </div>
    </div>

    <div class="col-span-12 xl:col-span-6">
      <div class="card">
        <div class="font-semibold text-xl mb-4">Bán hàng gần đây</div>
        <DataTable
          :value="dataDashboard.top5LastestProducts || []"
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column style="width: 15%" header="Ảnh">
            <template #body="slotProps">
              <img
                :src="slotProps.data.thumbnail[0]"
                :alt="slotProps.data.image"
                width="50"
                class="shadow"
              />
            </template>
          </Column>
          <Column field="name" header="Name" style="width: 35%"></Column>
          <Column field="price" header="Đơn giá" style="width: 35%">
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.price) }} đ
            </template>
          </Column>
          <Column field="quantity" header="SL" style="width: 15%"></Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <div class="font-semibold text-xl">Sản phẩm bán chạy nhất</div>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu2.toggle($event)"
            ></Button>
            <Menu ref="menu2" :popup="true" :model="items" class="!min-w-40"></Menu>
          </div>
        </div>
        <ul class="list-none p-0 m-0">
          <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span
                class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
                >Space T-Shirt</span
              >
              <div class="mt-1 text-muted-color">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 flex items-center">
              <div
                class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                style="height: 8px"
              >
                <div class="bg-orange-500 h-full" style="width: 50%"></div>
              </div>
              <span class="text-orange-500 ml-4 font-medium">%50</span>
            </div>
          </li>
          <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span
                class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
                >Portal Sticker</span
              >
              <div class="mt-1 text-muted-color">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
              <div
                class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                style="height: 8px"
              >
                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
              </div>
              <span class="text-cyan-500 ml-4 font-medium">%16</span>
            </div>
          </li>
          <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span
                class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
                >Supernova Sticker</span
              >
              <div class="mt-1 text-muted-color">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
              <div
                class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                style="height: 8px"
              >
                <div class="bg-pink-500 h-full" style="width: 67%"></div>
              </div>
              <span class="text-pink-500 ml-4 font-medium">%67</span>
            </div>
          </li>
          <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span
                class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
                >Wonders Notebook</span
              >
              <div class="mt-1 text-muted-color">Office</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
              <div
                class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                style="height: 8px"
              >
                <div class="bg-green-500 h-full" style="width: 35%"></div>
              </div>
              <span class="text-primary ml-4 font-medium">%35</span>
            </div>
          </li>
          <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span
                class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
                >Mat Black Case</span
              >
              <div class="mt-1 text-muted-color">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
              <div
                class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                style="height: 8px"
              >
                <div class="bg-purple-500 h-full" style="width: 75%"></div>
              </div>
              <span class="text-purple-500 ml-4 font-medium">%75</span>
            </div>
          </li>
          <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <span
                class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
                >Robots T-Shirt</span
              >
              <div class="mt-1 text-muted-color">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-20 flex items-center">
              <div
                class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24"
                style="height: 8px"
              >
                <div class="bg-teal-500 h-full" style="width: 40%"></div>
              </div>
              <span class="text-teal-500 ml-4 font-medium">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-12 xl:col-span-6">
      <div class="card">
        <div class="font-semibold text-xl mb-4">Dòng doanh thu</div>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
      </div>
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <div class="font-semibold text-xl">Thông báo</div>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu1.toggle($event)"
            ></Button>
            <Menu ref="menu1" :popup="true" :model="items" class="!min-w-40"></Menu>
          </div>
        </div>

        <span class="block text-muted-color font-medium mb-4">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
          <li class="flex items-center py-2 border-b border-surface">
            <div
              class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0"
            >
              <i class="pi pi-dollar !text-xl text-blue-500"></i>
            </div>
            <span class="text-surface-900 dark:text-surface-0 leading-normal"
              >Richard Jones
              <span class="text-surface-700 dark:text-surface-100"
                >has purchased a blue t-shirt for
                <span class="text-primary font-bold">$79.00</span></span
              >
            </span>
          </li>
          <li class="flex items-center py-2">
            <div
              class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0"
            >
              <i class="pi pi-download !text-xl text-orange-500"></i>
            </div>
            <span class="text-surface-700 dark:text-surface-100 leading-normal"
              >Your request for withdrawal of
              <span class="text-primary font-bold">$2500.00</span> has been
              initiated.</span
            >
          </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
        <ul class="p-0 m-0 list-none mb-6">
          <li class="flex items-center py-2 border-b border-surface">
            <div
              class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0"
            >
              <i class="pi pi-dollar !text-xl text-blue-500"></i>
            </div>
            <span class="text-surface-900 dark:text-surface-0 leading-normal"
              >Keyser Wick
              <span class="text-surface-700 dark:text-surface-100"
                >has purchased a black jacket for
                <span class="text-primary font-bold">$59.00</span></span
              >
            </span>
          </li>
          <li class="flex items-center py-2 border-b border-surface">
            <div
              class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0"
            >
              <i class="pi pi-question !text-xl text-pink-500"></i>
            </div>
            <span class="text-surface-900 dark:text-surface-0 leading-normal"
              >Jane Davis
              <span class="text-surface-700 dark:text-surface-100"
                >has posted a new questions about your product.</span
              >
            </span>
          </li>
        </ul>
        <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
        <ul class="p-0 m-0 list-none">
          <li class="flex items-center py-2 border-b border-surface">
            <div
              class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0"
            >
              <i class="pi pi-arrow-up !text-xl text-green-500"></i>
            </div>
            <span class="text-surface-900 dark:text-surface-0 leading-normal"
              >Your revenue has increased by
              <span class="text-primary font-bold">%25</span>.</span
            >
          </li>
          <li class="flex items-center py-2 border-b border-surface">
            <div
              class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0"
            >
              <i class="pi pi-heart !text-xl text-purple-500"></i>
            </div>
            <span class="text-surface-900 dark:text-surface-0 leading-normal"
              ><span class="text-primary font-bold">12</span> users have added your
              products to their wishlist.</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
