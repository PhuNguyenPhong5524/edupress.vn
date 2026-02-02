import { create } from "zustand";
import axios from "axios";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

export const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,

  // ======================
  // FETCH CART BY USER
  // ======================
  fetchCart: async (userId) => {
    if (!userId) return;

    set({ loading: true });

    try {
      const res = await axios.get(API);
      const carts = res?.data?.data?.data ?? [];

      const userCart = carts.find(
        c => Number(c.user_id) === Number(userId) && c.status === "active"
      );

      set({
        cart: userCart || null,
        loading: false,
      });
    } catch {
      set({ cart: null, loading: false });
    }
  },

  // ======================
  // ADD COURSE TO CART
  // ======================
  addToCart: async (courseId, userId) => {
    if (!userId) return false;

    const { cart } = get();

    // 🟢 CHƯA CÓ CART → TẠO CART MỚI
    if (!cart) {
      await axios.post(API, {
        user_id: userId,
        status: "active",
        courses: [{ course_id: courseId }],
        created_at: new Date().toISOString(),
      });

      await get().fetchCart(userId);
      return true;
    }

    // 🔴 ĐÃ CÓ COURSE
    const exists = cart.courses.some(
      c => c.course_id === courseId
    );
    if (exists) return false;

    // 🟢 UPDATE CART (PUT FULL OBJECT)
    await axios.put(
      `${API}&id=${cart._id}`,
      {
        ...cart,
        courses: [...cart.courses, { course_id: courseId }],
        updated_at: new Date().toISOString(),
      }
    );

    set({
      cart: {
        ...cart,
        courses: [...cart.courses, { course_id: courseId }],
      }
    });

    return true;
  },

  // ======================
  // REMOVE COURSE
  // ======================
  removeFromCart: async (courseId) => {
    const { cart } = get();
    if (!cart) return;

    const newCourses = cart.courses.filter(
      c => c.course_id !== courseId
    );

    await axios.put(
      `${API}&id=${cart._id}`,
      { ...cart, courses: newCourses }
    );

    set({
      cart: { ...cart, courses: newCourses }
    });
  },

  // ======================
  // CHECKOUT / CLEAR CART
  // ======================
  checkoutCart: async () => {
    const { cart } = get();
    if (!cart) return;

    await axios.put(
      `${API}&id=${cart._id}`,
      {
        ...cart,
        status: "checked_out",
        courses: [],
      }
    );

    set({ cart: null });
  },

  clearLocalCart: () => set({ cart: null }),
}));
