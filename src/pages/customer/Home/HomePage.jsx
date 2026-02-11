

import Banner from './BoxBanner/Banner';
import BoxShowCategory from '../../customer/Home/BoxShowCategory/BoxShowCategory';
import useFetchData from '../../../api/useFetchData'
import BoxShowFeaturedCourse from './BoxShowfeaturedCourse/BoxShowFeaturedCourse';
import BoxShowNewCourse from './BoxShowNewCour/BoxShowNewCourse';
import BoxBannerSmall from '../../../components/BoxBannerSmall';
import BoxOverviewInstructor from './BoxOverviewInstructor/BoxOverviewInstructor'
import BoxShowCourseCategory from './BoxShowCourseCategory/BoxShowCourseCategory';
import { useTranslation } from 'react-i18next';


const HomePage = () => {
    const { t }= useTranslation();
    const {data: categories, loading} = useFetchData('categories');
    const {data: courses, loading: loadingCourse } = useFetchData('courses');
    return (
        <div>
            {/* <!-- Banner --> */}
                <Banner />
            {/* Main */}
                <div className="max-w-[1080px] px-[15px] lg:px-0 mx-auto relative">
                    {/* <!-- Section danh mục--> */}
                        <BoxShowCategory  
                            categories={categories} 
                            loading={loading} 
                        />
                    {/* <!-- Section sản phẩm nổi bật--> */}
                        <BoxShowFeaturedCourse 
                            courses={courses} 
                            loading={loadingCourse} 
                            btnsw={'feature'}
                        />
                    {/* <!-- Section khóa học mới--> */}
                        <BoxShowNewCourse 
                            courses={courses} 
                            loading={loadingCourse} 
                            btnsw={'newCour'}
                        />
                    {/* <!-- Box Banner Quảng bá khóa học--> */}
                        <BoxBannerSmall 
                            titleSmall={t('home.banner_Small.title_small')}
                            title={t('home.banner_Small.title_big')}
                            content={t('home.banner_Small.content')}
                            color1={'#B5FFE7'} 
                            color2={'#FDC1C1'}
                            img={'/images/banner-ptweb.png'}
                        />
                    {/* <!-- Box Overview Instructions --> */}
                        <BoxOverviewInstructor />
                    {/* <!-- Section Khóa học--> */}
                        <BoxShowCourseCategory
                            courses={courses}
                            loading={loadingCourse}
                            category={'69573760d58c9265fe052c10'}
                            categories={categories}
                            btnsw={'courCate1'}
                        />
                    {/* <!-- Section Khóa học--> */}
                        <BoxShowCourseCategory
                            courses={courses}
                            loading={loadingCourse}
                            category={'69573792d58c9265fe052c24'}
                            categories={categories}
                            btnsw={'courCate2'}
                        />
                </div>
        </div>
    )
}

export default HomePage;