import BoxTabCheckHS from "./BoxTabCheckHS/BoxTabCheckHS";
import useFetchData from "../../../api/useFetchData";


const CheckoutHistoryPage = () => {
    const {data: checkout} = useFetchData("checkout");
    return (
        <div className="max-w-[1080px] mx-auto mt-[80px]">
            <div className="min-h-screen bg-gray-100 py-2 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-start gap-2 mb-6">
                        <h1 className=" text-[14px] md:text-[16px] lg:text-[28px] font-semibold text-[#000000]">Lịch sử giao dịch</h1>
                        <div className="w-[100px] "><hr  className="border-[1px] border-[#000000] w-full"/></div>
                    </div>

                    <BoxTabCheckHS data={checkout} />
                </div>
            </div>
        </div>
    )
}

export default CheckoutHistoryPage;