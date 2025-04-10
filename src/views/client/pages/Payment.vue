<template>
  <div class="h-screen container mx-auto py-10">
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-3">
        <strong class="text-lg">Liên hệ</strong>
        <div class="flex flex-col gap-3 card">
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Email hoặc số điện thoại di động</label>
            <InputText v-model="payload.email"></InputText>
          </div>
          <strong class="text-lg">Địa chỉ giao hàng</strong>
          <div class="flex flex-col gap-2">
            <label class="font-semibold"
              >Tỉnh/Thành phố <sup class="text-red-500">*</sup></label
            >
            <Select
              v-model="selectedProvince"
              filter
              fluid
              :placeholder="payload?.province || ''"
              :options="Province"
              option-label="FullName"
              @change="onProvinceChange"
              :invalid="submitted && !selectedProvince"
            ></Select>
            <small v-if="submitted && !selectedProvince" class="text-red-500"
              >Vui lòng nhập thành phố</small
            >
          </div>
          <div class="flex justify-between gap-2">
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold"
                >Quận/Huyện <sup class="text-red-500">*</sup></label
              >
              <Select
                v-model="selectedDistrict"
                filter
                fluid
                :placeholder="payload?.district || ''"
                :options="Districts"
                @change="onDistrictChange"
                option-label="FullName"
                :invalid="submitted && !selectedDistrict"
              ></Select>
              <small v-if="submitted && !selectedDistrict" class="text-red-500"
                >Vui lòng nhập quận/huyện</small
              >
            </div>
            <div class="flex flex-col gap-2 w-full">
              <label class="font-semibold"
                >Phường/Xã <sup class="text-red-500">*</sup></label
              >
              <Select
                filter
                v-model="payload.ward"
                :options="Wards"
                option-value="FullName"
                :placeholder="payload?.ward || ''"
                option-label="FullName"
                :invalid="submitted && !payload.ward"
                fluid
              ></Select>
              <small v-if="submitted && !payload.ward" class="text-red-500"
                >Vui lòng nhập phường/xã</small
              >
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Địa chỉ</label>
            <InputText v-model="payload.addressLine"></InputText>
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold"
              >Số điện thoại <sup class="text-red-500">*</sup></label
            >
            <InputText
              v-model="payload.phone"
              :invalid="submitted && !payload.phone"
            ></InputText>
            <small v-if="submitted && !payload.phone" class="text-red-500"
              >Vui lòng nhập số điện thoại</small
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Họ tên <sup class="text-red-500">*</sup></label>
            <InputText
              v-model="payload.fullName"
              :invalid="submitted && !payload.fullName"
            ></InputText>
            <small v-if="submitted && !payload.fullName" class="text-red-500"
              >Vui lòng nhập họ tên</small
            >
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Ghi chú</label>
            <Textarea v-model="payload.notes"></Textarea>
          </div>
        </div>
      </div>
      <div>
        <strong class="text-lg">Sản phẩm</strong>
        <div class="flex flex-col justify-between bg-gray-100 card mt-3">
          <div class="flex flex-col gap-2">
            <div
              class="items-center p-3 m-0"
              v-for="(item, index) in itemCart.items"
              :key="index"
            >
              <div class="grid items-center grid-cols-12 m-0">
                <div class="col-span-2">
                  <Image
                    crossorigin="anonymous"
                    :src="item.images ? item.images[0] : ``"
                    alt="Image"
                    width="70"
                    preview
                  ></Image>
                </div>
                <div class="col-span-10 flex flex-col grow">
                  <strong>{{ item.productName }}</strong>
                  <div class="flex items-center justify-between gap-3 mb-2">
                    <span
                      >Số lượng:
                      <strong class="text-primary">{{ item.quantity }}</strong></span
                    >
                    <span
                      >Giá sản phẩm:
                      <strong class="text-primary">
                        {{
                          discount(item)
                            ? formatPrice(item.price - discount(item))
                            : formatPrice(item.price)
                        }}đ</strong
                      ></span
                    >
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-end gap-1 items-center text-lg">
              <span>Tổng tiền:</span>
              <strong v-if="route.query.prd && itemCart">
                {{
                  couponData.finalPrice
                    ? formatPrice(couponData.finalPrice)
                    : itemCart.items?.length > 0
                    ? formatPrice(
                        itemCart.items[0]?.price -
                          itemCart.items[0]?.price * (itemCart.items[0]?.discount / 100)
                      )
                    : 0
                }}đ</strong
              >
              <strong v-else
                >{{
                  couponData.finalPrice
                    ? formatPrice(couponData.finalPrice)
                    : formatPrice(itemCart.finalPrice)
                }}đ</strong
              >
            </div>
            <div class="flex justify-end items-center">
              <div class="flex gap-2 align-middle">
                <span class="text-nowrap">Phương thức thanh toán:</span>
                <div class="flex flex-wrap gap-4">
                  <div class="flex items-center gap-2">
                    <RadioButton
                      v-model="payload.paymentMethod"
                      inputId="ingredient1"
                      name="payment"
                      value="zalo"
                    />
                    <label for="ingredient1">ZaloPay</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <RadioButton
                      v-model="payload.paymentMethod"
                      inputId="ingredient2"
                      name="payment"
                      value="cod"
                    />
                    <label for="ingredient2">COD</label>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <Button
                  @click="openCouponDlg"
                  :label="
                    couponData.discountValue
                      ? `Coupon giảm giá (-${formatPrice(couponData.discountValue)}đ)`
                      : 'Coupon giảm giá'
                  "
                  icon="pi pi-ticket"
                  text
                ></Button>
                <Button @click="confirmOrder()" label="Thanh toán"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Drawer v-model:visible="couponModal" position="right" style="width: 30%">
      <template #header>
        <div class="flex items-center gap-2">
          <Button icon="pi pi-ticket" text></Button>
          <span class="font-bold">Coupon giảm giá</span>
        </div>
      </template>

      <ScrollPanel
        v-for="(item, index) in Coupons"
        :key="index"
        style="width: 100%"
        class="flex flex-col my-5"
      >
        <div
          @click="useCoupon(item)"
          class="coupon hover:scale-105 transition-all ease-in-out duration-150"
        >
          <div class="left"></div>
          <div class="center text-white">
            <div class="flex flex-col gap-2">
              <div class="">{{ item.CouponName }}</div>
              <div class="">
                Giá trị: {{ formatPrice(item.CouponValue)
                }}{{ item.CouponType == "percent" ? "%" : "đ" }}
              </div>
              <div class="">Giá trị đơn hàng:{{ formatPrice(item.minOrderValue) }}đ</div>
            </div>
          </div>
          <div class="right"></div>
        </div>
      </ScrollPanel>
    </Drawer>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>
<script setup>
import API from "@/api/api-main";
import { useAuthStore } from "@/store";
import { useToast } from "primevue/usetoast";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";
import { useCartStore } from "../store/carts";

const { getItem, discount } = useCartStore();
const { proxy } = getCurrentInstance();
const toast = useToast();
const router = useRouter();
const isLoading = ref(false);
const couponData = ref({});
const Coupons = ref([]);
const auth = useAuthStore();
const user = auth.user.metadata.user;
const selectedProvince = ref();
const selectedDistrict = ref();
const Province = ref([]);
const Districts = ref([]);
const Wards = ref([]);
const itemCart = ref([]);
const submitted = ref(false);

const payload = ref({
  email: user.email,
  paymentMethod: "cod",
});

const route = useRoute();
const couponModal = ref(false);
onMounted(async () => {
  itemCart.value = await getItem();
  fetchProvince();
  if (route.query.prd) {
    fetchProductById(route.query.prd);
  }
  getMe();
});
const totalComputed = computed(() => {
  return itemCart.value?.items?.reduce((total, el) => {
    return total + el.price * el.quantity;
  }, 0);
});
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US").format(price);
};
const fetchProvince = async () => {
  try {
    const res = await API.get(`province`);
    Province.value = res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};
const fetchDistrict = async (province) => {
  try {
    const res = await API.get(`province/district/${province.Code}`);
    Districts.value = res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};
const fetchWard = async (district) => {
  console.log(district);
  try {
    const res = await API.get(`province/ward/${district.Code}`);
    Wards.value = res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};

const onProvinceChange = (e) => {
  payload.value.province = selectedProvince.value.FullName;
  fetchDistrict(e.value);
};
const onDistrictChange = (e) => {
  payload.value.district = selectedDistrict.value.FullName;
  fetchWard(e.value);
};
const openCouponDlg = () => {
  fetchAllCoupon();
  couponModal.value = true;
};
const fetchAllCoupon = async () => {
  try {
    const res = await API.get(`coupon`);
    Coupons.value = res.data.metadata.result;
  } catch (error) {
    console.log(error);
  }
};
const useCoupon = async (cp) => {
  isLoading.value = true;
  let items = [];

  if (route.query.prd && route.query.qt) {
    items.push({
      productId: route.query.prd || null,
      quantity: route.query.qt || null,
    });
  } else {
    items = itemCart.value.items.map((el) => ({
      productId: el.productId,
      quantity: el.quantity,
    }));
  }

  let data = {
    coupon: cp._id,
    items,
  };
  try {
    const res = await API.create(`coupon/apply`, data);
    proxy.$notify(
      res.status === 200 ? "S" : "E",
      res.status === 200 ? `Sử dụng thành công coupon!` : res?.response?.data?.message,
      toast
    );
    if (res.status === 200) {
      couponData.value = res.data?.metadata;
    }
  } catch (error) {
    console.log(error);
  } finally {
    couponModal.value = false;
    isLoading.value = false;
  }
};
const confirmOrder = async () => {
  submitted.value = true;
  let items = [];
  if (route.query.prd && route.query.qt) {
    items.push({
      productId: route.query.prd || null,
      quantity: route.query.qt || null,
    });
  } else {
    items = itemCart.value.items.map((el) => ({
      productId: el.productId,
      quantity: el.quantity,
    }));
  }

  let data = {
    ...payload.value,
    orderType: route.query.prd ? "" : "Cart",
    coupon: couponData.value.couponId,
    items,
  };
  if (!(await validate(data))) return false;

  try {
    const res = await API.create(`order/CheckoutWithPayload`, data);

    proxy.$notify(
      res.status === 200 ? "S" : "E",
      res.status === 200 ? `Đặt hàng thành công!` : res,
      toast
    );
    router.push("/client/new-products");
    if (res.data?.metadata.return_code === 1) {
      router.push("/client/payment-ing");
      window.open(res.data?.metadata?.order_url, "_blank");
    }
  } catch (error) {
    proxy.$notify("E", error, toast);
  }
};
const fetchProductById = async (id) => {
  try {
    const res = await API.get(`product/${id}`);
    itemCart.value.items = [];
    itemCart.value.items.push({ ...res.data.metadata, quantity: route.query.qt });
  } catch (error) {
    console.log(error);
  }
};
watch(route, (newVal, oldVal) => {
  location.reload();
});
const validate = async (payload) => {
  const schema = yup.object({
    email: yup.string().required("Vui lòng nhập email"),
    fullName: yup.string().required("Vui lòng nhập họ tên"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    province: yup.string().required("Vui lòng chọn thành phố"),
    district: yup.string().required("Vui lòng chọn quận huyện"),
    province: yup.string().required("Vui lòng chọn xã/phường"),
    items: yup.array().min(1, "Phải có ít nhất 1 sản phẩm"),
  });

  try {
    await schema.validate(payload, { abortEarly: false });
    return true;
  } catch (err) {
    if (err.errors.length) {
      err.errors.forEach((e) => {
        proxy.$notify("E", e, toast);
      });
    }
    return false;
  }
};

const getMe = async () => {
  const res = await API.get("get-me");
  payload.value.district = res.data.metadata.district;
  payload.value.province = res.data.metadata.province;
  payload.value.ward = res.data.metadata.ward;
  payload.value.phone = res.data.metadata.phone;
  payload.value.fullName = res.data.metadata.name;
};
</script>
<style>
.coupon {
  width: 95%;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: stretch;
  position: relative;
}
.coupon::before,
.coupon::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: -1;
}

.coupon::before {
  left: 0;
  background-image: radial-gradient(
    circle at 0 50%,
    transparent 25px,
    var(--primary-color) 26px
  );
}

.coupon::after {
  right: 0;
  background-image: radial-gradient(
    circle at 100% 50%,
    transparent 25px,
    var(--primary-color) 26px
  );
}

.coupon > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  width: 20%;
  border-right: 2px dashed rgba(0, 0, 0, 0.13);
}

.center {
  flex-grow: 1;
}

.right {
  width: 120px;
  background-image: radial-gradient(circle at 100% 50%, transparent 25px, #fff 26px);
}

.center h2 {
  background: #000;
  color: var(--primary-color);
  padding: 0 10px;
  font-size: 2.15rem;
  white-space: nowrap;
}

.center small {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 2px;
}
</style>
