<script setup>
import API from "@/api/api-main";
import DetailOrder from "@/components/DetailOrder.vue";
import { formatPrice } from "@/helper/formatPrice";
import { format } from "date-fns";
import { useToast } from "primevue/usetoast";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();
const toast = useToast();

const expandedRows = ref();

onMounted(() => {
  fetchAllGenres();
});

const paginator = reactive({
  rows: 5,
  page: 0,
  total: 0,
});
const Invoices = ref();
const orderDialog = ref(false);
const filterDialog = ref(false);
const orderDetail = ref({});

const submitted = ref(false);

const fetchAllGenres = async () => {
  try {
    const res = await API.get(`order?skip=0&limit=1000000`);
    Invoices.value = res.data.metadata.result;
    paginator.total = res.data.metadata.total;
  } catch (error) {
    console.log(error);
  }
};

function hideDialog() {
  orderDialog.value = false;
  submitted.value = false;
}

const saveGenre = async () => {
  let data = { ...orderDetail.value };
  submitted.value = true;
  let API_EP = data._id ? `genre/${data._id}` : `genre`;
  let FUNC_API = data._id ? API.updatev2(API_EP, data) : API.create(API_EP, data);
  try {
    const res = await FUNC_API;
    if (res.data) {
      orderDialog.value = false;
      proxy.$notify("S", "Thành công!", toast);
      fetchAllGenres();
    }
  } catch (error) {
    console.log(error);
  }
};
const openFilter = () => {
  filterDialog.value = true;
};

const getStatus = (status) => {
  switch (status) {
    case "pending":
      return "Đang chờ";
      break;
    case "paid":
      return "Đã thanh toán";
      break;
    case "cancelled":
      return "Hủy";
      break;
    case "shipped":
      return "Đang giao hàng";
      break;
    case "delivered":
      return "Đang nhận hàng";
      break;
    case "confirmed":
      return "Đã xác nhận";
      break;

    default:
      break;
  }
};
</script>

<template>
  <div>
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <strong class="text-lg">Đơn hàng</strong>
        </template>
        <template #end>
          <Button label="Bộ lọc" icon="pi pi-filter" @click="openFilter()" />
        </template>
      </Toolbar>

      <DataTable
        :value="Invoices"
        show-gridlines
        paginator
        :rows="15"
        :page="paginator.page"
        :total-records="paginator.total"
        v-model:expandedRows="expandedRows"
        resizableColumns
        columnResizeMode="fit"
        scrollable
        scrollHeight="70vh"
      >
        <Column expander style="width: 5rem" />
        <Column header="#">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column header="Mã đơn hàng" field="_id" style="max-width: 200px"> </Column>
        <Column header="KM">
          <template #body="{ data }">
            {{
              data.coupon
                ? `${data?.coupon?.CouponName} (${formatPrice(
                    data?.coupon?.CouponValue
                  )})`
                : `Không KM`
            }}
          </template>
        </Column>
        <Column header="Giá trị đơn hàng (VNĐ)" style="text-align: end">
          <template #body="{ data }">
            {{ formatPrice(data.totalPrice) }}
          </template>
        </Column>
        <Column header="Đơn giá sau KM (VNĐ)" style="text-align: end">
          <template #body="{ data }">
            {{ formatPrice(data.finalPrice) }}
          </template>
        </Column>
        <Column header="Ngày đặt hàng">
          <template #body="{ data }">
            {{ format(data.createdAt, "dd/MM/yyyy") }}
          </template>
        </Column>
        <Column header="Phương thức thanh toán" style="text-align: center">
          <template #body="{ data }">
            {{ data.paymentMethod == "cod" ? "COD" : "ZaloPay" }}
          </template>
        </Column>
        <Column header="Trạng thái">
          <template #body="{ data }">
            {{ getStatus(data.status) }}
          </template>
        </Column>
        <Column header="Thao tác" alignFrozen="right" frozen>
          <template #body="{ data }">
            <DetailOrder :data="data"></DetailOrder>
          </template>
        </Column>
        <template #expansion="slotProps">
          <div class="p-4">
            <h5 class="mb-2">Chi tiết đơn hàng</h5>
            <DataTable
              :value="slotProps.data.items"
              resizableColumns
              columnResizeMode="fit"
            >
              <Column field="_id" header="Id" sortable></Column>
              <Column field="productName" header="Ảnh" sortable>
                <template #body="slotProps">
                  <Image :src="slotProps.data.images[0]" width="70" preview></Image>
                </template>
              </Column>
              <Column field="productName" header="Tên sản phẩm" sortable></Column>
              <Column
                field="quantity"
                header="Số lượng"
                sortable
                style="text-align: end"
              ></Column>
              <Column
                field="price"
                header="Đơn giá (VNĐ)"
                sortable
                style="text-align: end"
              >
                <template #body="{ data }">
                  {{ formatPrice(data.price) }}
                </template>
              </Column>
              <Column field="discount" header="Giảm giá (%)" sortable></Column>
              <Column
                field="amount"
                header="Tổng tiền (VNĐ)"
                sortable
                style="text-align: end"
              >
                <template #body="slotProps">
                  {{ formatPrice(slotProps.data.quantity * slotProps.data.price) }}
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="orderDialog"
      :style="{ width: '450px' }"
      header="Thể loại"
      :modal="true"
    >
      <div class="flex flex-col gap-6">
        <div>
          <label for="name" class="block font-bold mb-3">Thể loại</label>
          <InputText
            id="name"
            v-model="orderDetail.genreName"
            required="true"
            autofocus
            :invalid="submitted && !orderDetail.genreName"
            fluid
          />
          <small v-if="submitted && !orderDetail.genreName" class="text-red-500"
            >Tên không được để trống</small
          >
        </div>
        <div>
          <label for="description" class="block font-bold mb-3">Mô tả</label>
          <Textarea
            id="description"
            v-model="orderDetail.genreDescription"
            required="true"
            rows="3"
            cols="20"
            fluid
          />
        </div>
      </div>

      <template #footer>
        <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Xác nhận" icon="pi pi-check" @click="saveGenre" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="filterDialog"
      :style="{ width: '450px' }"
      header="Bộ lọc"
      :modal="true"
    >
      <Dropdown :options="statusOpts"></Dropdown>
    </Dialog>
  </div>
</template>
