// resources/js/lib/swiperSettings.js
import { Navigation, Pagination, Autoplay } from "swiper/modules"

export const swiperSettings = {
  modules: [Navigation, Autoplay],
  spaceBetween: 20,
  navigation: true,
  pagination: { clickable: true },
  autoplay: { delay: 3000, disableOnInteraction: false },
  loop: true,
  breakpoints: {
    1920: { slidesPerView: 6 },
    1440: { slidesPerView: 5 },
    1280: { slidesPerView: 4 },
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    480: { slidesPerView: 1 },
    // className="custom-swiper"
  },
}
