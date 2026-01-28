

import Banner from './BoxBanner/Banner';
import BoxShowCategory from '../../customer/Home/BoxShowCategory/BoxShowCategory';
import useFetchData from '../../../api/useFetchData'
import BoxShowFeaturedCourse from './BoxShowfeaturedCourse/BoxShowFeaturedCourse';
import BoxShowNewCourse from './BoxShowNewCour/BoxShowNewCourse';
import BoxBannerSmall from '../../../components/BoxBannerSmall';
import BoxOverviewInstructor from './BoxOverviewInstructor/BoxOverviewInstructor'
import BoxShowCourseCategory from './BoxShowCourseCategory/BoxShowCourseCategory';


const HomePage = () => {
    
    const {data: categories, loading} = useFetchData('categories');
    const {data: courses, loading: loadingCourse } = useFetchData('courses');
    return (
        <div>
            {/* <!-- Banner --> */}
                <Banner />
            {/* Main */}
                <div className="max-w-[1080px] px-[15px] lg:px-0 mx-auto relative">
                    {/* <!-- Section danh mục--> */}
                        <BoxShowCategory  categories={categories} loading={loading} />
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
                            titleSmall={'KHÁM PHÁ KIẾN THỨC MỖI NGÀY'}
                            title={'Nâng cấp kỹ năng – Sẵn sàng cho sự nghiệp'}
                            content={'Khóa học thực hành về lập trình, thiết kế và kỹ năng số. Học mọi lúc, mọi nơi cùng chuyên gia trong ngành.'}
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
                            category={1}
                            categories={categories}
                            btnsw={''}
                        />
                    {/* <!-- Section Khóa học--> */}
                        <BoxShowCourseCategory
                            courses={courses}
                            loading={loadingCourse}
                            category={2}
                            categories={categories}
                            btnsw={''}
                        />
                </div>
        </div>
    )
}

export default HomePage;