
'use client';

import BagShoppingIcon from "../icons/BagShoppingIcon";
import BellIcon from "../icons/BellIcon";
import ChevronDown from "../icons/ChevronDown";
import UserIcon from "../icons/UserIcon";
import useFetchData from "../../api/useFetchData";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MenuMoblie from "./MenuMoblie";
import SearchModal from "./SearchDropdown";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../LanguageSelect";


const Header = () => {
    const { t } = useTranslation();
    const {data: categories, loading} = useFetchData('categories');
    const {data: courses, loading: loadingCourse } = useFetchData('courses');
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
                    z-1000 ${show ? 'translate-y-0' : '-translate-y-full'} bg-[#c2c2c2]

                `
            }
        >
            <div className="bg-[#ffffff] flex items-center shadow-md ">
                <div 
                    className="
                        lg:max-w-[1080px] mx-auto flex items-center justify-between  w-full h-full 
                        px-[15px] lg:px-0
                    "
                >   
                    {/* Button Mobile */}
                        <div className=" lg:hidden">
                            <MenuMoblie />
                        </div>
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
                            <p className="hidden lg:block text-[12px] font-semibold text-center">{t('header.slogan')}</p>
                        </Link>
                    {/* <!-- Menu --> */}
                        <nav className="hidden lg:block">
                            <ul className="flex items-center overflow-visible">
                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav1')}
                                    </Link>
                                </li>

                                <li className="relative group cursor-pointer h-[64px] px-[20px] flex items-center">
                                    <Link
                                        to="/"
                                        className="nav-link flex items-center gap-2 text-[16px] font-semibold"
                                    >
                                        <span>{t('header.nav2')}</span>
                                        <ChevronDown
                                            size={20}
                                            className="transition-transform duration-300 group-hover:rotate-180"
                                        />
                                    </Link>

                                    {/* Spacer giữ hover */}
                                    <div className="absolute left-0 top-full h-3 w-[300px]"></div>

                                    {/* Submenu */}
                                    <div
                                        className="
                                            submenu
                                            absolute left-0 top-full mt-3 w-[300px] h-[380px]
                                            bg-white rounded-xl border border-[#EAEAEA]
                                            shadow-xl
                                            opacity-0 invisible translate-y-2 scale-95
                                            transition-all duration-200 ease-out
                                            origin-top
                                            group-hover:opacity-100
                                            group-hover:visible
                                            group-hover:translate-y-0
                                            group-hover:scale-100
                                            z-50 overflow-hidden
                                        "
                                    >
                                        <ul className="h-full overflow-y-auto py-2">
                                            {loading ? (
                                                <p className="px-4 py-2 text-sm text-gray-500">
                                                    Loading...
                                                </p>
                                            ) : (
                                                categories?.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className="
                                                            px-[20px] py-[10px]
                                                            cursor-pointer
                                                            transition-all duration-200
                                                            hover:text-[#FF782D]
                                                            hover:bg-[#F9F9F9]
                                                        "
                                                    >
                                                        <Link
                                                            to="/"
                                                            className="block text-[16px] font-semibold"
                                                        >
                                                            {item.cate_name}
                                                        </Link>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                </li>


                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav3')}
                                    </Link>
                                </li>

                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav4')}
                                    </Link>
                                </li>

                                <li className="h-[64px] px-[20px] flex items-center">
                                    <Link to="/" className="nav-link text-[16px] font-semibold">
                                        {t('header.nav5')}
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        
                        <div className="flex items-center gap-[10px]">
                            <ul className="flex items-center leading-[30px]">

                                <SearchModal 
                                    courses={courses}
                                    loading={loadingCourse}
                                />

                                {/* Bell */}
                                    <li
                                        className="
                                            hidden lg:flex items-center justify-center
                                            h-[64px] w-[48px]
                                            text-[#000] text-[18px]
                                            cursor-pointer
                                            transition-colors duration-200
                                            hover:text-[#FF782D] hover:bg-[#F5F5F5]
                                            rounded-md
                                        "
                                    >
                                        <BellIcon size={24} />
                                    </li>

                                {/* Cart */}
                                    <li className="relative group">
                                    {/* Icon */}
                                        <div
                                            className="
                                            relative flex items-center justify-center
                                            h-[64px] w-[48px]
                                            cursor-pointer
                                            transition-colors duration-200
                                            group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D]
                                            rounded-md
                                            "
                                        >
                                            <BagShoppingIcon size={24} />

                                            {/* Badge */}
                                            <span
                                            className="
                                                absolute top-[14px] right-[8px]
                                                w-[16px] h-[16px]
                                                text-[10px] text-white
                                                bg-red-500 rounded-full
                                                flex items-center justify-center
                                            "
                                            >
                                            0
                                            </span>
                                        </div>

                                        {/* Spacer giữ hover */}
                                        <div className="absolute top-full right-0 h-3 w-full"></div>

                                        {/* Dropdown */}
                                        <div
                                            className="
                                            absolute right-0 top-full mt-3
                                            w-[300px] bg-white
                                            rounded-xl border border-[#EAEAEA]
                                            shadow-xl
                                            opacity-0 invisible
                                            translate-y-2 scale-95
                                            transition-all duration-200 ease-out
                                            origin-top
                                            group-hover:opacity-100 group-hover:visible
                                            group-hover:translate-y-0 group-hover:scale-100
                                            z-50
                                            "
                                        >
                                            <div className="p-4">
                                            <div className="flex gap-3">
                                                <img
                                                src="https://v2.fullbootcamp.com/uploads/0f57a59b2dcc410385e6b40d922e9bb1_c0165976ca.webp"
                                                className="w-[60px] h-[60px] rounded-lg object-cover"
                                                />
                                                <div>
                                                <p className="font-semibold text-[15px] line-clamp-1 hover:text-[#FF782D] cursor-pointer">
                                                    Fullstack PHP & Laravel
                                                </p>
                                                <p className="text-sm text-gray-500 line-clamp-2">
                                                    Chuyển đổi tuần luyện tập với Fullstack PHP & Laravel
                                                </p>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="border-t px-4 py-3 text-center">
                                            <p className="text-lg font-semibold">
                                                Tổng: <span className="text-[#FF782D]">200.000đ</span>
                                            </p>
                                            <p className="text-sm text-gray-500">2 khóa học</p>
                                            <button
                                                className="
                                                mt-3 w-full h-[44px]
                                                rounded-lg bg-[#FF782D]
                                                text-white font-semibold
                                                hover:bg-[#FF782D]/80 transition
                                                "
                                            >
                                                Chuyển đến giỏ hàng
                                            </button>
                                            </div>
                                        </div>
                                    </li>

                                {/* User */}
                                    <li className="relative group hidden lg:block">
                                        <div
                                            className="
                                            flex items-center justify-center
                                            h-[64px] w-[48px]
                                            cursor-pointer
                                            transition-colors duration-200
                                            group-hover:bg-[#F5F5F5] group-hover:text-[#FF782D]
                                            rounded-md
                                            "
                                        >
                                            <UserIcon size={24} />
                                        </div>

                                        {/* Spacer */}
                                        <div className="absolute top-full right-0 h-3 w-full"></div>

                                        <ul
                                            className="
                                            absolute right-0 top-full mt-3
                                            w-[220px] overflow-hidden   
                                            bg-white rounded-xl
                                            border border-[#EAEAEA]
                                            shadow-xl
                                            opacity-0 invisible
                                            translate-y-2 scale-95
                                            transition-all duration-200 ease-out
                                            origin-top
                                            group-hover:opacity-100 group-hover:visible
                                            group-hover:translate-y-0 group-hover:scale-100
                                            z-50
                                            "
                                        >
                                            <li 
                                                className=" 
                                                    text-black px-3 py-2 border-l-2 border-l-[#ffffff] 
                                                    cursor-pointer transition-all duration-300 ease-in-out 
                                                    hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] 
                                                    hover:pl-5 text-[16px] font-semibold whitespace-nowrap overflow-hidden 
                                                " 
                                            > 
                                                <Link to="/login">{t('header.login')}</Link> 
                                            </li>
                                            <li 
                                                className=" 
                                                    text-black px-3 py-2 border-l-2 border-l-[#ffffff] 
                                                    cursor-pointer transition-all duration-300 ease-in-out 
                                                    hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] 
                                                    hover:pl-5 text-[16px] font-semibold whitespace-nowrap overflow-hidden 
                                                " 
                                            > 
                                                <Link to="/register">{t('header.register')}</Link> 
                                            </li>
                                        </ul>
                                    </li>

                                {/* Language */}
                                    <li
                                        className="
                                            hidden lg:flex items-center justify-center
                                            h-[64px] w-[48px]
                                            cursor-pointer
                                            transition-colors duration-200
                                            hover:bg-[#F5F5F5]
                                            rounded-md
                                        "
                                    >
                                        <LanguageSelect />
                                    </li>

                            </ul>
                        </div>

                
                </div>
            </div>
        </header>
    )
}

export default Header;