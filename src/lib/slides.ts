import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
export type Slide = {
  id: string;
  image: string;
  mobileImage: string;
  alt: string;
  isActive: boolean;
};
export type SlideSettings = { configured: boolean; slides: Slide[] };
export const DEFAULT_SLIDES: Slide[] = [1, 0, 2, 3, 4, 5, 6, 7, 9, 10].map((number, index) => ({
  id: `00000000-0000-0000-0000-${String(index + 1).padStart(12, "0")}`,
  image: `/slides/Banner${number}.png`,
  mobileImage: "",
  alt: `Sadhya collection banner ${number}`,
  isActive: true,
}));
export function useSlides(admin = false) {
  return useQuery({
    queryKey: [admin ? "admin-slides" : "slides"],
    queryFn: () => api<SlideSettings>(admin ? "/admin/slides" : "/slides"),
    refetchInterval: admin ? false : 30000,
    retry: 1,
  });
}
