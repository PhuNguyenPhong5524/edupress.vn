
import CircleCheckIcon from "../../../../components/icons/CircleCheckIcon";
import PlayIcon from "../../../../components/icons/PlayIcon";

const BoxCourseInfoCard = ({showList}) => {
    return (
        <div
            className={
                `
                 bg-white text-gray-800 rounded-[10px] shadow-xl p-4 transition-all duration-500 border-[0.5px] border-[#EAEAEA] 
                `
            }
        >
            {
                showList && (
                    <div>
                        <div className="relative group overflow-hidden rounded-md h-auto">
                            <div className="imageCour">
                                <img src={showList.image_url} alt={showList.course_title}
                                    className="w-[400px] h-full rounded-md mb-3 object-cover transform transition-all ease-in-out duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
                                <button
                                    type="button"
                                    className="
                                        bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer
                                        animate-pulse border-2 border-white text-[#FF782D] hover:bg-[#FF782D] hover:text-[#ffffff] transition-all duration-300 hover:scale-110
                                    "
                                >
                                    <PlayIcon size={25} className="" />
                                </button>
                                <span className="text-[16px] font-semibold text-[#ffffff] -translate-y-[-20px] underline">Xem trước khóa học</span>
                            </div>
                        </div>
                        <div className="mb-2">
                            { 
                                showList.price === 0 
                                ? <span className="text-green-400 font-semibold text-[20px]">Free</span>
                                : <div className="text-[30px] text-red-600 font-bold py-[10px]">
                                    {Number(showList.price).toLocaleString('vi-VN')} 
                                    <span className="text-[20px] underline align-super">đ</span>
                                </div>
                            }
                        </div>
                        <button 
                            className="
                                w-full bg-[#FF782D] text-white py-2 rounded-md mb-2 cusor-pointer
                                transform transition-all duration-300 ease-in-out hover:opacity-70 hover:scale-95
                            "
                        >
                            Thêm giỏ hàng
                        </button>
                        <button 
                            className="
                                w-full border border-[#FF782D] text-[#FF782D] py-2 rounded-md cusor-pointer
                                transform transition-all duration-300 ease-in-out hover:bg-[#FF782D] hover:text-[#ffffff] 
                            "
                        >
                            Đăng ký khóa học
                        </button>
                        <p className=" text-gray-500 mt-2 flex items-center gap-1">
                            <CircleCheckIcon size={20} className="text-[#FF782D]" /> 
                            <span>Truy cập trọn đời · Chứng nhận</span>
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default BoxCourseInfoCard;