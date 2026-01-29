

import { Link } from "react-router";
import FaceBookIcon from "./icons/FaceBookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import PinterestIcon from "./icons/PinterestIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="showFooter bg-[#F5F5F5] mt-[30px]">      
            <div>
                <div 
                className="
                    lg:max-w-[1080px] mx-auto lg:flex justify-between w-full
                    h-auto lg:py-[40px] gap-[150px] px-[20px] lg:px-0
                "
                >
                {/* Logo + description */}
                <div className="lg:w-[30%] mb-[20px] lg:mb-0">
                    <Link to="/" className="flex items-center gap-1 py-[10px] lg:py-0">
                    <img
                        src="/images/logo.png"
                        alt="EduPress Logo"
                        className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]"
                    />
                    <p className="font-bold md:text-[24px] lg:text-[28px]">EduPress</p>
                    </Link>
                    <p className="lg:mt-[20px] font-regular text-[10px] md:text-[12px] lg:text-[16px] text-[#555555] text-justify">
                    EduPress kết nối học viên với chuyên gia uy tín, cung cấp các khóa học chất lượng cao về công nghệ,
                    kỹ năng mềm và phát triển nghề nghiệp. Học mọi lúc, mọi nơi để sẵn sàng cho tương lai.
                    </p>
                </div>

                {/* Right content */}
                <div className="lg:w-[70%] md:flex lg:justify-between">

                    {/* Support */}
                    <div className="w-full">
                    <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] lg:pt-[5px] mb-[5px] lg:mb-[20px]">
                        Hỗ trợ
                    </h3>
                    <ul className="leading-[25px] md:leading-[30px] lg:leading-[40px]">
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Liên hệ
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Hỏi đáp thường gặp (FAQ)
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Chính sách & Điều khoản
                        </Link>
                        </li>
                    </ul>
                    </div>

                    {/* Programs */}
                    <div className="w-full">
                    <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] pt-[5px] mb-[5px] lg:mb-[20px]">
                        Chương trình học
                    </h3>
                    <ul className="leading-[25px] md:leading-[30px] lg:leading-[40px]">
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Phát triển Web
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Khoa học Dữ liệu
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Ứng dụng Di động
                        </Link>
                        </li>
                        <li>
                        <Link to="#" className="footer-link text-[10px] md:text-[12px] lg:text-[16px]">
                            Tất cả chương trình
                        </Link>
                        </li>
                    </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-full">
                    <h3 className="text-[#000000] font-semibold text-[12px] md:text-[18px] lg:text-[20px] pt-[5px] mb-[5px] lg:mb-[20px]">
                        Liên hệ
                    </h3>
                    <div className="leading-[30px]">
                        <p className="text-[#555555] text-[10px] md:text-[12px] lg:text-[16px]">
                        Địa chỉ: 1235 Đường mới, Quận Bình Tân, TP. Hồ Chí Minh
                        </p>
                        <p className="text-[#555555] text-[10px] md:text-[12px] lg:text-[16px]">
                        Điện thoại: (0123) 456-789
                        </p>
                        <p className="text-[#555555] text-[10px] md:text-[12px] lg:text-[16px]">
                        Email: hotro@edupress.vn
                        </p>
                    </div>

                    {/* Social icons */}
                    <div className="flex gap-[10px] items-center py-[10px] lg:mt-[20px] translate-x-[-5px]">
                        <FaceBookIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <InstagramIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <YoutubeIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <PinterestIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                        <TwitterIcon size={24} className="text-[#555555] hover:text-[#FF782D] transition-all" />
                    </div>
                    </div>

                </div>
                </div>

                {/* Bottom */}
                <div className="max-w-[1290px] mx-auto">
                <hr className="w-full h-[1px] bg-[#555555] opacity-10" />
                <p className="text-[10px] md:text-[12px] lg:text-[16px] text-[#555555] text-center py-[10px]">
                    © 2025 EduPress | Nền tảng học trực tuyến cho thế hệ chuyên nghiệp
                </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer;