import TitleHome from "../../../../components/title/TitleHome";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourse from "../../../../components/SwiperShowCourse";
import { useTranslation } from "react-i18next";

const BoxShowCourseCategory = ({courses, loading, categories, category, btnsw}) => {
    const showCourseCategory = courses?.filter(item => item.category_id === category).sort((item1, item2) => item1.id - item2.id);

    const categoryName = categories?.filter(item => item._id === category)[0]?.cate_name;
    const { t } = useTranslation();
  return (
    <div>
        <div className="py-[30px] flex justify-between items-center">
            {/* <!-- Title --> */}
                <TitleHome  
                    title={categoryName}
                    description={t('home.title_Home.title_5.description')}
                />
            {/* <!-- Button --> */}
                {/* <ButtonViewAll nameLink={"/course"} /> */}
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourse courses={showCourseCategory} loading={loading} btnsw={btnsw} />
           
    </div>
    )   
}
export default BoxShowCourseCategory;