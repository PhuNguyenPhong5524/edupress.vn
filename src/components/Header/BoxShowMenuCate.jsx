import { Link } from "react-router";



const BoxShowMenuCate = ({categories, loading}) => {
    return (
        <div
            className="
                submenu
                absolute left-0 top-full mt-3 w-[300px] h-[380px] bg-white rounded-xl border border-[#EAEAEA]
                shadow-xl opacity-0 invisible translate-y-2 scale-95 transition-all duration-200 ease-out
                origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                group-hover:scale-100 z-50 overflow-hidden
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
                                text-black px-3 py-3 border-l-2 border-l-[#ffffff] flex
                                items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out 
                                hover:border-[#FFAC2D] hover:bg-white hover:text-[#FF782D] 
                                hover:pl-5 text-[16px] font-semibold whitespace-nowrap overflow-hidden 
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
    )
};

export default BoxShowMenuCate;