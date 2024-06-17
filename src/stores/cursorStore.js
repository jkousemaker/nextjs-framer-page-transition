import { create } from "zustand";

export const useCursorStore = create((set) => ({
  content: "Click",
  variant: "default",
  setCursorContent: (value) => set({ content: value }),
  setCursorVariant: (value) => set({ variant: value }),
}));
