import { memo, useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import BoxShowInfo from "./BoxShowInfo/BoxShowInfo";
import BoxShowTabsCourse from "./BoxShowTabsCourse/BoxShowTabsCourse";
import BoxCourseInfoCard from "./BoxShowInfo/BoxCourseInfoCard";
import useFetchData from "../../../api/useFetchData";
import { useParams } from "react-router";
import { useStickyObserver } from "../../../hooks/useStickyObserver";
import BoxShowCourseRelated from './BoxShowCourseRelated/BoxShowCourseRelated'
import { useCartStore } from "../../../stores/cart.store";
import useAuth from "../../../hooks/useAuth";

// Sticky Card
const StickyCard = memo(({ show, showList, handleAddToCart, adding, isPurchased }) => {
  if (!show) return null;
  return (
    <div className="lg:sticky lg:top-[100px] transform transition-all esease-in-out duration-300">
        <BoxCourseInfoCard  
            showList={showList} 
            handleAddToCart={handleAddToCart} 
            adding={adding}
            isPurchased={isPurchased}
        />
    </div>
  );
});


const DetailPage = () => {
    const [showStickyCard, setShowStickyCard] = useState(false);
    const { _id } = useParams();
    const { data: course = [], loading } = useFetchData("courses");
    const { data: providers = [] } = useFetchData("providers");
    const { cart , addToCart} = useCartStore();
    const [adding, setAdding] = useState(false);
    const showList = useMemo(() => {
        if (loading) return null;
        return course.find(item => item._id == _id);
    }, [course, _id, loading]);

    {/* Scroll observer */}
    useStickyObserver(setShowStickyCard);
    const {user, isAuthenticated} = useAuth();   
    const { data : checkoutList } = useFetchData("checkout");
    const isPurchased = useMemo(() => {
        if (!checkoutList || !user || !showList) return null;

        return checkoutList.some(order =>
            order.user_id === user._id &&
            order.status === "paid" &&
            order.courses.some(c => c.course_id === showList._id)
        );
    }, [checkoutList, user, showList]);


  return (
   <div className="mt-[65px] lg:mt-[60px]">
    {/* Breadcrumb */}
        <Breadcrumb nameCate="Chi tiết khóa học" showList={showList} />
        {/* Box Show Info */}
            <BoxShowInfo 
                showStickyCard={showStickyCard} 
                showList={showList} 
                loading={loading} 
                addToCart={addToCart}
                cart={cart}
                adding={adding}
                setAdding={setAdding}
                user={user}
                isAuthenticated={isAuthenticated}
                isPurchased={isPurchased}
            />
        {/* Nội dung chính */}
            <div
                className="
                    max-w-[1080px] mx-auto grid gap-8 py-10 grid-cols-1
                    lg:grid-cols-[2fr_1fr] px-[15px] lg:px-0
                "
            >
                {/* LEFT */}
                    <div className="min-w-0 flex flex-col gap-10">
                        <BoxShowTabsCourse showList={showList} loading={loading}/>
                        <BoxShowCourseRelated courses={course} currentCourses={showList} providers={providers} />
                    </div>

                {/* RIGHT */}
                    <div className="hidden lg:block min-w-0">
                        <StickyCard
                            show={showStickyCard}
                            showList={showList}
                            handleAddToCart={addToCart}
                            adding={adding}
                            isPurchased={isPurchased}
                        />

                    </div>
            </div>
    </div>

  );
}
export default DetailPage;