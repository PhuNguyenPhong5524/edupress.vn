

import { Link } from "react-router";
import FaceBookIcon from "./icons/FaceBookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import PinterestIcon from "./icons/PinterestIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";

const Footer = () => {
    return (
        <footer className="showFooter bg-[#F5F5F5] mt-[30px]">      
            <div>
                <div 
                    className="
                        lg:max-w-[1080px] mx-auto lg:flex justify-between w-full
                        h-auto lg:py-[40px] gap-[150px] px-[20px] lg:px-0
                    "
                >
                    <div className="lg:w-[30%] mb-[20px] lg:mb-0">
                        <Link to="/" className="flex items-center gap-1 py-[10px] lg:py-0">
                            <img src="/images/logo.png" alt="EduPress Logo" className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]" />
                            <p className=" font-bold md:text-[24px] lg:text-[28px]">EduPress</p>
                        </Link>
                        <p className="lg:mt-[20px] font-regular text-[10px] md:text-[12px] lg:text-[16px] text-[#555555] text-justify">
                            EduPress kết nối học viên với chuyên gia uy tín, cung cấp các khóa học chất lượng cao về công nghệ, 
                            kỹ năng mềm và phát triển nghề nghiệp. Học mọi lúc, mọi nơi để sẵn sàng cho tương lai.
                        </p>
                    </div>
                    <div className="lg:w-[70%] md:flex lg:justify-between ">
                        <div className="w-full">
                            <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] lg:pt-[5px] mb-[5px] lg:mb-[20px]">Hỗ trợ</h3>
                            <ul className="leading-[25px] md:leading-[30px] lg:leading-[40px]">
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#" className="">Liên hệ</Link>
                                </li>
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#">Hỏi đáp thường gặp (FAQ)</Link>
                                </li>
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#">Chính sách & Điều khoản</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] pt-[5px] lg:pt-[5px] mb-[5px] lg:mb-[20px]">Chương trình học</h3>
                            <ul className="leading-[25px] md:leading-[30px] lg:leading-[40px]">
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#">Phát triển Web</Link>
                                </li>
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#">Khoa học Dữ liệu</Link>
                                </li>
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#">Ứng dụng Di động</Link>
                                </li>
                                <li 
                                    className="
                                        text-[#555555] text-[10px] md:text-[12px] lg:text-[16px] font-regular transform
                                        transition-all duration-300 ease-in-out hover:text-[#FF782D] cursor-pointer
                                        hover:pl-[10px] hover:underline
                                    "
                                >
                                    <Link to="#">Tất cả chương trình</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] pt-[5px] lg:pt-[5px] mb-[5px] lg:mb-[20px]">Liên hệ</h3>
                            <div className="leading-[30px]">
                                <p className="text-[#555555] font-regular text-[10px] md:text-[12px] lg:text-[16px]">Địa chỉ: 1235 Đường mới, Quận Bình Tân, TP. Hồ Chí Minh</p>
                                <p className="text-[#555555] font-regular text-[10px] md:text-[12px] lg:text-[16px]">Điện thoại: (0123) 456-789 </p>
                                <p className="text-[#555555] font-regular text-[10px] md:text-[12px] lg:text-[16px]">Email: hotro@edupress.vn</p>
                            </div>
                            <div className="flex gap-[10px] items-center py-[10px] lg:mt-[20px] translate-x-[-5px]">
                                <FaceBookIcon 
                                    size={24} 
                                    className="
                                        text-[#555555] text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer
                                        transform transition-all ease-in-out duration-300 hover:text-[#FF782D]
                                    "
                                />
                                <InstagramIcon 
                                    size={24} 
                                    className="
                                        text-[#555555] text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer
                                        transform transition-all ease-in-out duration-300 hover:text-[#FF782D]
                                    "
                                />
                                <YoutubeIcon
                                    size={24}
                                    className="
                                        text-[#555555] text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer
                                        transform transition-all ease-in-out duration-300 hover:text-[#FF782D]
                                    "
                                />
                                <PinterestIcon
                                    size={24}
                                    className="
                                        text-[#555555] text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer
                                        transform transition-all ease-in-out duration-300 hover:text-[#FF782D]
                                    "
                                />
                                <TwitterIcon
                                    size={24}
                                    className="
                                        text-[#555555] text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer
                                        transform transition-all ease-in-out duration-300 hover:text-[#FF782D]
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1290px] mx-auto">
                    <hr className="w-full h-[1px] bg-[#555555] opacity-10 "/>
                    <p className="text-[10px] md:text-[12px] lg:text-[16px] font-regular text-[#555555] text-center py-[10px]">© 2025 EduPress | Nền tảng học trực tuyến cho thế hệ chuyên nghiệp</p>
                </div>
            </div>
        </footer> 
    )
}

export default Footer;