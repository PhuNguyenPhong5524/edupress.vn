import { create } from "zustand";
import axios from "axios";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

export const useCartStore = create((set, get) => ({
    cart: [],
    loading: false,

    fetchCart: async () => {
        set({ loading: true });

        try {
            const res = await axios.get(API);

            set({
                cart: res?.data?.data?.data ?? [],
                loading: false,
            });
        } catch (err) {
            set({
                cart: [],
                loading: false,
            });
        }
    },

    addToCart: async (courseId, userId) => {
        if (!userId) return false;

        const { cart } = get();
        const exists = cart.some(i => i.course_id === courseId);
        if (exists) return false;

        await axios.post(API, {
            user_id: userId,
            course_id: courseId,
            status: "active",
            created_at: new Date().toISOString(),
        });

        await get().fetchCart(userId);
        return true;
    },

    clearCart: () => set({ cart: [], loading: false }),


    removeFromCart: async (cartId, userId) => {
        const { cart } = get();

        const cartItem = cart.find(
            item =>
            item._id === cartId &&
            Number(item.user_id) === Number(userId)
        );

        if (!cartItem) {
            console.warn("Không tìm thấy cart item hợp lệ", { cartId, userId });
            return;
        }

        await axios.delete(
            `https://mindx-mockup-server.vercel.app/api/resources/cart/${cartId}?apiKey=6957348a9dda81df11d0c527`
        );

        set({
            cart: cart.filter(item => item._id !== cartId)
        });
    }




}));
