
import { Input, Empty, Spin } from "antd";
import SearchIcon from "../icons/SearchIcon";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const ShowCourseSearch = ({keyword, setKeyword, results, loading, onclose}) => {
    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        if (!keyword) {
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);

        const timer = setTimeout(() => {
            setSearchLoading(false);
        }, 300); // giả lập loading search

        return () => clearTimeout(timer);
    }, [keyword]);

    return (
        <div
            className="
                flex flex-col justify-center p-2
            "
            >
            <div
                className="
                bg-white rounded-2xl shadow-xl p-4
                w-[calc(100vw-32px)] md:w-[360px] lg:w-[420px]
                "
            >
                {/* Input */}
                <Input
                    autoFocus
                    placeholder="Tìm khóa học..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    prefix={<SearchIcon size={16} />}
                    className="inputSearch"
                />

                {/* Results */}
               <div className="mt-4 max-h-[60vh] sm:max-h-[320px] overflow-y-auto">
                    { (loading || searchLoading) ? (
                        <div className="flex justify-center py-8">
                            <Spin />
                        </div>
                    ) : results && results.length ? (
                        <div>
                            <h1 className="py-[2px] pl-[10px] text-[16px] text-[#000000] font-semibold border-l-[4px] border-l-[#ffa25f]">
                                {keyword ? "Kết quả tìm kiếm" : "Khóa học nổi bật"}
                            </h1>

                            {results.map(item => (
                                <div
                                key={item.id}
                                className="flex gap-3 p-3 rounded-xl hover:bg-[#e6e6e6] cursor-pointer transition relative"
                                >
                                <img
                                    src={item.image_url}
                                    alt={item.course_title}
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                                />

                                <span className="absolute top-[5px] left-[5px] bg-[#fff1d9] text-[#ff0000] text-[12px] font-bold rounded-full">
                                    ⭐
                                </span>

                                <div className="flex-1">
                                    <Link 
                                        to={`/detail/${item._id}`}
                                        onClick={onclose}
                                    >
                                    <h4 className="text-sm font-semibold text-[#000000] line-clamp-2">
                                        {item.course_title}
                                    </h4>
                                    </Link>
                                    <p className="text-xs text-gray-500">{item.author}</p>
                                    <p className="text-sm font-medium text-[#ff0000]">
                                    {item.price === 0
                                        ? <span className="text-green-400 font-semibold">Free</span>
                                        : `${Number(item.price).toLocaleString("vi-VN")} VND`}
                                    </p>
                                </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Empty description="Không tìm thấy khóa học 😢" />
                    )}
                    </div>

            </div>
        </div>
    )
};

export default ShowCourseSearch;