import { memo, useEffect, useMemo, useRef, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import BoxShowInfo from "./BoxShowInfo/BoxShowInfo";
import BoxShowTabsCourse from "./BoxShowTabsCourse/BoxShowTabsCourse";
import BoxCourseInfoCard from "./BoxShowInfo/BoxCourseInfoCard";
import useFetchData from "../../../api/useFetchData";
import { useParams } from "react-router";
import StickyObserver from "./StickyObserver";

const StickyCard = memo(({ show, showList }) => {
  if (!show) return null;
  return (
    <div className="sticky top-[100px] transform transition-all esease-in-out duration-300">
      <BoxCourseInfoCard  showList={showList}   />
    </div>
  );
});


const DetailPage = () => {
    const [showStickyCard, setShowStickyCard] = useState(false);

    const { _id } = useParams();
    const { data: course = [] } = useFetchData("courses");

    const showList = useMemo(() => {
        return course?.find(item => String(item._id) === String(_id));
    }, [course, _id]);


  return (
   <div className="mt-[80px]">
     {/* Scroll observer */}
        <StickyObserver onChange={setShowStickyCard} />
      {/* <!-- Breadcrumb --> */}
        <Breadcrumb nameCate="Chi tiết khách hàng" showList={showList} />
            {/* Box Show Info */}
            <BoxShowInfo showStickyCard={showStickyCard} showList={showList} />
                {/* <!-- Nội dung khóa học và box giá --> */}
                    <div className="max-w-[1080px] mx-auto grid grid-cols-[2fr_1fr] gap-8 py-10 ">
                        {/* <!-- Box Left --> */}
                            <div>
                                {/* <!-- Tab Content --> */}
                                <BoxShowTabsCourse  showList={showList} />
                            </div>
                        {/* <!-- Box Right  --> */}
                            <div>
                                <StickyCard show={showStickyCard} showList={showList} />
                            </div>
                    </div>
   </div>
  );
}
export default DetailPage;