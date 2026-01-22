import TickIcon from "../../../../components/icons/TickIcon";


const BoxOverview = ({showList}) => {
    return (
           <div id="overview" className="tab-content bg-[#F5F5F5] rounded-b-[15px] p-1">
                <div className="border border-gray-300 px-[10px] py-[10px] rounded-[5px]">
                    <h2 className="text-[#000000] text-[18px] font-bold mb-[10px]">Nội dung bài học</h2>
                    <div className="grid grid-cols-2 gap-5">
                        {
                            showList && (
                                showList?.overview.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2">
                                        <TickIcon size={20} className="text-[#bebebe]"/>
                                        <span className="text-[14px] text-[#000000] font-semibold">{item.overview_name}</span>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
    )
}

export default BoxOverview;