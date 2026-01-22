
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BoxCateGory from "./BoxCategory";
import ChevronLeftIcon from "../../../../components/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../../../components/icons/ChevronRightIcon";


const SwiperCategory = ({ categories, loading }) => {
  return (
        <div className="relative">
            {/* Custom arrows */}
            <button 
                className="
                    cate-prev absolute left-[-5px] lg:-left-5 top-1/2 -translate-y-1/2 z-10 border-[1px] border-[#E0E0E0]
                    w-10 h-10 bg-white rounded-full shadow flex items-center justify-center 
                    hover:bg-[#FF782D] hover:text-white hover:opacity-60 transition cursor-pointer
                "
            >
                <ChevronLeftIcon size={20} />
            </button>

            <button 
                className="
                cate-next absolute right-[-5px] lg:-right-5 top-1/2 -translate-y-1/2 z-10 border-[1px] border-[#E0E0E0] 
                w-10 h-10 bg-white rounded-full shadow flex items-center justify-center
                hover:bg-[#FF782D] hover:text-white hover:opacity-60 transition cursor-pointer
                "
            >
                <ChevronRightIcon size={20} />
            </button>

            <Swiper
                modules={[Navigation]}
                navigation={{
                prevEl: ".cate-prev",
                nextEl: ".cate-next",
                }}
                spaceBetween={12}
                slidesPerView={6}
                slidesPerGroup={6}
                grabCursor
                breakpoints={{
                1024: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                },
                768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                480: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                0: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                }}
            >
                {
                loading ? (
                    <button className="cate-btn w-full h-[180px] bg-[#d8d8d8] text-[#000000] rounded-[20px] animate-pulse flex justify-center items-center">
                        Loading...
                    </button>
                ) : (
                    categories?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BoxCateGory item={item} />
                        </SwiperSlide>
                    ))
                )}
           
            </Swiper>
        </div>
    );
}

export default SwiperCategory;

