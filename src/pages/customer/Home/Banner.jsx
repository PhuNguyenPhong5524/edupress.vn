
const Banner = () => {
    return (
        <div className="bgr-banner flex justify-center items-center overflow-hidden">
            {/* <!-- Banner Background --> */}
                <div className=" w-full h-[540px] lg:h-[700px] relative group">
                    {/* <!-- Image Banner --> */}
                        <div 
                            className="
                                absolute bottom-0 left-0 w-full h-auto transform translate-x-[-100px]
                                transition-all duration-300 ease-in-out group-hover:translate-x-0
                            "
                        >
                            <img src="images/img_banner4.png" alt="banner" className="" />
                        </div>
                    {/* <!-- Image Banner --> */}
                        <div 
                            className="
                                absolute top-0 left-0 w-full h-auto transform translate-y-[-60px]
                                transition-all duration-300 ease-in-out group-hover:translate-y-0
                            "
                        >
                            <img src="images/img_banner1.png" alt="banner" className="" />
                        </div>
                    <div 
                        className="
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            max-w-[1080px] w-full h-auto flex items-center z-50
                        "
                    >
                        {/* <!-- Content --> */}
                            <div className="absolute px-[15px] lg:px-0 lg:left-0 flex flex-col justify-center gap-[40px] lg:gap-[24px] z-[60] w-[40%]">
                                <h1 className="text-[18px] font-bold lg:text-[48px] lg:font-semibold w-[500px]">Học nhanh <br /> Làm chủ kỹ năng!</h1>
                                <p className="text-[14px] lg:text-[18px] font-regular">
                                    Xây dựng sự nghiệp vững chắc với các khóa học thực tiễn được biên soạn bởi chuyên gia hàng đầu trong từng lĩnh vực.
                                </p>
                                <button 
                                    className="
                                        bg-[#FF782D] rounded-[24px] w-[200px] h-[48px] transform transition-transform duration-300 ease-in-out
                                        hover:opacity-80 hover:shadow-md hover:scale-110 animate-pulse
                                    "
                                >
                                    <a className="text-[18px] font-medium text-white" href="#">
                                        Xem tất cả khóa học
                                    </a>
                                </button>
                                
                            </div>
                        {/* <!-- Image Banner --> */}
                            <div 
                                className="
                                    absolute right-[-40px] z-[52] scale-[90%] transform transition-all duration-300 ease-in-out
                                    group-hover:scale-[95%]
                                "
                            >
                                <img src="images/img_banner2.png" alt="banner" className="" />
                            </div>
                        {/* <!-- Image Banner --> */}
                            <div 
                                className="
                                    absolute right-[-100px] z-[52] translate-x-[50px] transform transition-all duration-300 ease-in-out
                                    translate-y-[30px] lg:translate-y-[60px] lg:group-hover:translate-x-0
                                "
                            >
                                <img src="images/img_banner6.png" alt="banner" className="" />
                            </div>
                    </div>
                    {/* <!-- Image Banner --> */}
                        <div 
                            className="
                                absolute right-0 bottom-0 -translate-y-[-70px] transform transition-all duration-300 ease-in-out
                                group-hover:translate-y-0
                            "
                        >
                            <img src="images/img_banner3.png" alt="banner" className="" />
                        </div>
                    {/* <!-- Image Banner --> */}
                        <div 
                            className="
                                absolute right-0 -translate-x-[-70px] transform transition-all duration-300 ease-in-out
                                group-hover:translate-x-0
                            "
                        >
                            <img src="images/img_banner5.png" alt="banner" className="" />
                        </div>
                </div>
        </div>
    );
}

export default Banner;