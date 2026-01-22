
'use client';

import BagShoppingIcon from "./icons/BagShoppingIcon";
import BellIcon from "./icons/BellIcon";
import ChevronDown from "./icons/ChevronDown";
import SearchIcon from "./icons/SearchIcon";
import UserIcon from "./icons/UserIcon";
import BarsIcon from "./icons/BarsIcon";
import useFetchData from "../api/useFetchData";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

const Header = () => {

    const {data: categories, loading} = useFetchData('categories');
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {    
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollY.current) {
                // Scrolling down
                setShow(false);
            } else {
                // Scrolling up
                setShow(true);
            }
            lastScrollY.current = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header 
            className={
                `
                    top-0 fixed w-full transition-transform ease-in-out duration-300 shadow-md
                    z-1000 ${show ? 'translate-y-0' : '-translate-y-full'} 

                `
            }
        >
            <div className="bg-[#ffffff] flex items-center shadow-md ">
                <div 
                    className="
                        lg:max-w-[1080px] mx-auto flex items-center justify-between w-full h-full 
                        px-[15px] lg:px-0
                    "
                >   
                    {/* Button Mobile */}
                        <button 
                            className="
                                lg:hidden  hover:text-[#FF782D]
                            "
                        >
                            <BarsIcon size={24} />
                        </button>
                    {/* div */}
                        <div className="w-[50px] md:w-[180px] bg-[#ffffff] lg:hidden"></div>
                    {/* <!-- Logo --> */}
                        <Link to="/" className="md:leading-[20px] w-full flex md:w-auto md:flex-col justify-center items-center">
                            <div className="flex items-center gap-1 ">
                                <img src="/images/logo.png" alt="EduPress Logo" className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]" />
                                <p 
                                    className=" 
                                        font-bold md:text-[24px] lg:text-[28px]
                                    "
                                >   
                                    EduPress
                                </p>
                            </div>
                            <div className="hidden md:flex justify-center items-center translate-y-[3px]"><div className="w-[60px] h-1px bg-[#EAEAEA] border-0"></div></div>
                            <p className="hidden lg:block text-[12px] font-semibold text-center">Nền tảng học trực tuyến</p>
                        </Link>
                    {/* <!-- Menu --> */}
                        <nav 
                            className="
                                hidden lg:block
                            "
                        >
                            <ul className="flex overflow-visible">
                                <li className="text-[#000000] p-[25px] hover:bg-[#F5F5F5] hover:text-[#FF782D]">
                                    <Link className="text-[16px] font-semibold" to="/">Trang chủ</Link>
                                </li>
                                <li className="relative group cursor-pointer overflow-visible">
                                    <Link 
                                        to="/"
                                        className="flex items-center text-[16px] font-semibold gap-2 p-[25px] group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D]"
                                    >
                                        Khóa học
                                        <ChevronDown 
                                            size={24} 
                                            className="
                                                transform transition-transform duration-300 ease-in-out group-hover:rotate-180
                                            " 
                                        />
                                    </Link>

                                    {/* <!-- Submenu --> */}
                                        <div 
                                            className="
                                                absolute h-[5px] left-0 top-[100%] w-[300px] opacity-0
                                                group-hover:opacity-100 z-[49] shadow-xl 
                                            "
                                        >
                                        </div>
                                        <div
                                            className="absolute left-0 top-[100%] translate-y-[5px] w-[300px] bg-[#ffffff] shadow-md rounded-md h-[380px]
                                                    opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto overflow-y-auto
                                                    transition-all duration-300 z-50 scale-0 group-hover:scale-100 overflow-hidden boder border-[2px] border-[#EAEAEA]
                                                "
                                        >
                                            <ul 
                                                id="showCategory"
                                            >
                                                {
                                                    loading ? (
                                                        <p>loading...</p>
                                                    ) : (
                                                        categories?.map((item) => (
                                                            <li 
                                                                key={item.id}
                                                                className="
                                                                    group text-black px-[20px] py-[10px] cursor-pointer transform transition-all ease-in-out 
                                                                    duration-300 border-[2px] border-[#ffffff] hover:border-l-[2px] hover:border-l-[#FF782D]
                                                                    hover:bg-[#ffffff] hover:text-[#FF782D] hover:pl-[30px]
                                                                "
                                                            >
                                                                <Link className="text-[16px] font-semibold" to="/">
                                                                    {item.cate_name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    )
                                                }
                                            </ul>
                                        </div>
                                </li>
                                <li className="text-[#000000] p-[25px] hover:bg-[#F5F5F5] hover:text-[#FF782D]">
                                    <Link className="text-[16px] font-semibold" to="#">Bài viết</Link>
                                </li>
                                <li className="text-[#000000] p-[25px] hover:bg-[#F5F5F5] hover:text-[#FF782D]">
                                    <Link className="text-[16px] font-semibold" to="#">Về EduPress</Link>
                                </li>
                                <li className="text-[#000000] p-[25px] hover:bg-[#F5F5F5] hover:text-[#FF782D]">
                                    <Link className="text-[16px] font-semibold" to="#">Liên hệ</Link>
                                </li>
                            </ul>
                        </nav>
                    {/* <!-- Cart & Account --> */}
                        <div className="flex items-center gap-[25px]">
                            <ul className="flex items-center overflow-visible leading-[30px]">
                                <li className="text-[#000000] text-[18px] px-[5px] py-[15px] md:py-[20px] md:px-[15px] hover:text-[#FF782D] hover:bg-[#F5F5F5] cursor-pointer">
                                    <SearchIcon size={24}/>  
                                </li>
                                <li 
                                    className="
                                        text-[#000000] text-[18px] px-[5px] py-[15px] md:py-[20px] md:px-[15px] hover:text-[#FF782D] 
                                        hover:bg-[#F5F5F5] cursor-pointer hidden lg:block
                                    "
                                >
                                    <BellIcon size={24}/>
                                </li>
                                <li className="relative group overflow-visible">
                                    {/* <!-- Nút giỏ hàng --> */}
                                        <Link
                                            to="#"
                                            className="flex items-center text-[18px] font-semibold gap-2 md:px-[15px] px-[5px] py-[15px] md:py-[20px] 
                                                group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D] relative z-1" 
                                        >
                                            <BagShoppingIcon size={24} />
                                            <span 
                                              className="
                                                absolute top-[10px] right-[1px] lg:top-[15px] lg:right-[10px] w-[15px] h-[15px] 
                                                text-[10px] text-white bg-red-500 rounded-full z-2 flex justify-center items-center
                                              "
                                            >
                                              0
                                            </span>
                                        </Link>
                                        <div 
                                            className="absolute h-[10px] right-0 top-full w-[300px] 
                                                z-[49] opacity-0 pointer-events-auto"
                                        ></div>
                                        {/* <!-- Box hiển thị giỏ hàng --> */}
                                            <div
                                                className="absolute right-0 top-full translate-y-[8px] w-[300px] bg-white shadow-md rounded-md
                                                    opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto 
                                                    py-[5px] transition-all duration-200 z-50 scale-95 group-hover:scale-100 
                                                    overflow-hidden border border-[#EAEAEA]"
                                            >
                                                <div>
                                                    {/* <!-- Box Course --> */}
                                                        <div className="showCart">
                                                            <div className="px-[10px]">
                                                                <div className="flex items-center">
                                                                    <div className="w-[25%]">
                                                                        <img 
                                                                            src="https://v2.fullbootcamp.com/uploads/0f57a59b2dcc410385e6b40d922e9bb1_c0165976ca.webp" 
                                                                            alt="" 
                                                                            className="w-[60px] h-[60px] object-cover rounded-[10px] my-[10px]"
                                                                        />
                                                                    </div>
                                                                    <div className="w-[75%]">
                                                                        <Link 
                                                                            to="#"
                                                                            className="text-[16px] font-semibold text-black line-clamp-1 
                                                                                transition-all duration-300 hover:text-[#FF782D]"
                                                                        >
                                                                            Fullstack PHP & Laravel
                                                                        </Link>
                                                                        <p className="text-[14px] text-[#555555] line-clamp-2">
                                                                            Chuyển đổi tuần luyện tập với Fullstack PHP & Laravel
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="h-[0.5px] bg-black/20"></div>
                                                            </div>
                                                        </div>
                                                    {/* <!-- Total Price Course --> */}
                                                    <div className="px-[20px] py-[10px]">
                                                        <p className="text-[20px] font-semibold text-center">
                                                            Tổng: 
                                                            <span className="text-[#FF782D] text-[20px] font-semibold">200.000 đ</span> 
                                                            <del className="text-gray-400 text-[16px] font-normal">200.000 đ</del>
                                                        </p>
                                                        <p className="text-[14px] text-[#555555] text-center">2 Khóa học</p>
                                                        <button 
                                                            className="bg-[#FF782D] text-[16px] font-semibold text-white cursor-pointer w-full h-[48px] 
                                                                rounded-[10px] mt-[10px] hover:bg-[#FF782D]/70"
                                                        >
                                                            Chuyển đến giỏ hàng 
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                </li>

                                <li 
                                    className="
                                        relative group cursor-pointer overflow-visible hidden lg:block
                                    "
                                >
                                    <div
                                        id="avatar"
                                        className="flex items-center text-[16px] font-semibold gap-2 md:px-[15px] px-[5px] py-[15px] md:py-[20px] group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D] "
                                    >
                                        <UserIcon size={24} />
                                        
                                    </div>

                                    {/* <!-- Submenu User --> */}
                                        <div 
                                            className="
                                                absolute h-[5px] right-0 top-[100%] w-[200px] opacity-0
                                                group-hover:opacity-100 z-[49] shadow-xl
                                            "
                                        >
                                        </div>
                                        <ul
                                            id="userMenu"
                                            className="absolute right-0 top-[100%] translate-y-[5px] w-[250px] bg-[#ffffff] shadow-md rounded-md
                                                    opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto overflow-hidden
                                                    transition-all duration-300 z-50 scale-0 group-hover:scale-100 boder border-[2px] border-[#EAEAEA]
                                                "
                                        >
                                            <li className="
                                                text-black px-3 py-2 border-l-2 border-l-[#ffffff] cursor-pointer
                                                transition-all duration-300 ease-in-out
                                                hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] hover:pl-5
                                                text-[16px] font-semibold whitespace-nowrap overflow-hidden
                                            ">
                                                <Link to="/login">Đăng nhập</Link>
                                            </li>

                                            <li className="
                                                text-black px-3 py-2 border-l-2 border-l-[#ffffff] cursor-pointer
                                                transition-all duration-300 ease-in-out
                                                hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] hover:pl-5
                                                text-[16px] font-semibold whitespace-nowrap overflow-hidden
                                            ">
                                                <Link to="#">Đăng ký</Link>
                                            </li>
                                        </ul>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        </header>
    )
}

export default Header;