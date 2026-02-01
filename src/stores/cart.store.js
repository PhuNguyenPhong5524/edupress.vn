import { create } from "zustand";
import axios from "axios";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

export const useCartStore = create((set, get) => ({
    cart: [],
    loading: false,

    fetchCart: async (userId) => {
        if (!userId) return;

        set({ loading: true });

        try {
            const res = await axios.get(
            `${API}&user_id=${userId}&status=active`
            );

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


    addToCart: async (course, userId) => {
        if (!userId) return;

        const { cart } = get();
        if (cart.some(i => i.course_id === course.id)) return "EXISTED";

        await axios.post(API, {
        user_id: userId,
        course_id: course.id,
        price: course.price,
        discount_price: course.discount_price,
        status: "active"
        });

        await get().fetchCart(userId);
        return "ADDED";
    },

    removeFromCart: async (id, userId) => {
        if (!userId) return;

        await axios.delete(
        `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=6957348a9dda81df11d0c527`
        );

        await get().fetchCart(userId);
    }
}));
