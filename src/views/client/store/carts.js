import API from '@/api/api-main';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, ref } from 'vue';
export const useCartStore = defineStore('cart', () => {
    const { proxy } = getCurrentInstance();
    const toast = useToast()
    const cart = ref([]);
    const coupon  = ref([]);


    const getCartItems = () => {
        return cart.value;
    };
    const getItem = async () => {
        const res = await API.get(`cart`);
        return res.data.metadata
    };

    const addToCart = async (product) => {
        try {
            const res = await API.create('cart/addToCart', product)
            if (!res) {
                return proxy.$notify("E", "Có lỗi xảy ra!", toast)
            }
            proxy.$notify("S", res.data.message, toast)
            return res
        } catch (error) {
            throw new Error({ error })
        }
    };
    const updateCart = async (product) => {
        try {
            const res = await API.create(`cart/UpdateItem`, product)
            proxy.$notify("S", 'Cập nhật thành công', toast)
            return res
        } catch (error) {
            proxy.$notify("E", error, toast)
            console.log(error);
        }
    }
    const removeItem = async (productId) => {
        try {
            const res = await API.delete('cart/RemoveItem', productId)
            return res
        } catch (error) {
            console.log(error);
        }
    }
    const discount =  (item) =>{
        return item.price * (item.discount/100);
    }

    const setCoupon=(data)=>{
        coupon.value = data;
    }
   

    return {
        cart,
        getItem,
        addToCart,
        getCartItems,
        removeItem,
        updateCart,
        discount
    };
});
