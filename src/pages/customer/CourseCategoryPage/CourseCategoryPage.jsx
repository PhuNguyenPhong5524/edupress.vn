import Breadcrumb from "../../../components/Breadcrumb";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../../api/useFetchData";
import { Input, Checkbox, Radio, Divider, Spin } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import BoxCourse from "../../../components/BoxCourse";

const { Search } = Input;


const CourseCategoryPage = () => {
    const {_id} = useParams();
    const { data: course, loading } = useFetchData("courses");
    const { data: categories, loading: loadingCategory } = useFetchData("categories");

    const showList = useMemo(() => {
        return course?.filter(item => item.category_id === _id) || [];
    }, [course, _id]);

    const showNameCategory = useMemo(() => {
        return categories?.find(item => item._id === _id)?.cate_name || "";
    }, [categories, _id]);



    const isLoading = loading || loadingCategory;

    if(isLoading) {
        return(
            <Spin size="large"  fullscreen tip="Đang xử lý..."/>
        )
    };
    return (
        <div className="mt-[65px] lg:mt-[60px]">
            {/* Breadcrumb */}
                <Breadcrumb nameCate="Trang chủ" showList={showList} showNameCategory={showNameCategory} />
                {/* Main */}
                    {/* Main Layout */}
                        <div className="max-w-[1080px] px-[15px] lg:px-0 mx-auto relative">
                            {/* Header */}
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 my-6">
                                    <h1 className="text-lg md:text-xl font-semibold">
                                        All khóa học <span className="text-orange-500">Phát triển web</span>
                                    </h1>

                                    <div className="flex items-center gap-4">
                                        <Search
                                            placeholder="Tìm kiếm..."
                                            className="w-[200px] md:w-[300px]"
                                        />
                                        <AppstoreOutlined className="text-lg cursor-pointer" />
                                        <BarsOutlined className="text-lg cursor-pointer" />
                                    </div>
                                </div>
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                            
                                {/* LEFT - Course Grid */}
                                <div>
                                    <div className="
                                        grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2
                                    ">
                                        {
                                            showList?.length > 0 && !isLoading ? (
                                                showList.map((item) => (
                                                    <BoxCourse key={item._id} item={item} />
                                                ))
                                            ) : (
                                                <div className="text-center text-gray-400 py-10">
                                                    Không có khóa học
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* Pagination UI giả */}
                                    <div className="flex justify-center mt-8">
                                        <div className="flex gap-2">
                                        {[1,2,3,4].map((num) => (
                                            <button
                                                key={num}
                                                className="
                                                    w-8 h-8 rounded-full border
                                                    flex items-center justify-center
                                                    text-sm
                                                    hover:bg-orange-500 hover:text-white
                                                    transition
                                                "
                                            >
                                                {num}
                                            </button>
                                        ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT - Sidebar */}
                                <div 
                                    className="
                                    bg-white rounded-2xl shadow-sm p-5 h-fit
                                    "
                                >
                                
                                {/* Bộ lọc loại khóa học */}
                                <h3 className="font-semibold text-base mb-3">
                                    Loại khóa học
                                </h3>

                                <Radio.Group className="flex flex-col gap-2">
                                    <Radio value="all">Tất cả khóa học</Radio>
                                    <Radio value="new">Khóa học mới</Radio>
                                    <Radio value="featured">Khóa học nổi bật</Radio>
                                </Radio.Group>

                                <Divider />

                                {/* Giá */}
                                <h3 className="font-semibold text-base mb-3">
                                    Giá khóa học
                                </h3>

                                <Checkbox.Group className="flex flex-col gap-2">
                                    <Checkbox value="free">Miễn phí</Checkbox>
                                    <Checkbox value="under500">Dưới 500.000đ</Checkbox>
                                    <Checkbox value="500to1m">500.000đ - 1.000.000đ</Checkbox>
                                    <Checkbox value="over1m">Trên 1.000.000đ</Checkbox>
                                </Checkbox.Group>

                                </div>
                            </div>
                        </div>
        </div>
    )
}

export default CourseCategoryPage;