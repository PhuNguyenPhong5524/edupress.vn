
import { Link } from "react-router"
import SwiperCategory from "./SwiperCategory";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import TitleHome from "../../../../components/title/TitleHome";

const BoxShowCategory = ({categories, loading}) => {
    return (
        <div>
            {/* <!-- Title --> */}
                <div className="py-[30px] flex justify-between items-center">
                    {/* <!-- Title --> */}
                        <TitleHome  
                            title={"Danh mục khóa học"} 
                            description={"Khám phá tất cả danh mục của chúng tôi"} 
                        />
                    {/* <!-- Button --> */}
                        <ButtonViewAll nameLink={"/categories"} />
                </div>
            {/* <!-- Box Category --> */}
                <SwiperCategory categories={categories} loading={loading} />
        </div>
    )
}

export default BoxShowCategory;