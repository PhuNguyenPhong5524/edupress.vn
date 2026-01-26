

import Banner from './BoxBanner/Banner';
import BoxShowCategory from '../../customer/Home/BoxShowCategory/BoxShowCategory';
import useFetchData from '../../../api/useFetchData'
import BoxShowFeaturedCourse from './BoxShowfeaturedCourse/BoxShowFeaturedCourse';
import BoxShowNewCourse from './BoxShowNewCour/BoxShowNewCourse';



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
                        <BoxShowFeaturedCourse courses={courses} loading={loadingCourse} />
                    {/* <!-- Section khóa học mới--> */}
                        <BoxShowNewCourse courses={courses} loading={loadingCourse} />
                </div>
        </div>
    )
}

export default HomePage;