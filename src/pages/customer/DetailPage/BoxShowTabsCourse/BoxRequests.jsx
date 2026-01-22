


const BoxRequests = ({showList}) => {
    return (
        <div className="tab-content bg-[#F5F5F5] rounded-b-[15px] px-4">
            <ul className="list-disc list-inside text-[#000000] text-[16px] leading-[30px]">
                {
                    showList && (
                        showList?.request.map((item) => (
                            <li key={item.id}>{item.request_name}</li>
                        ))
                    )
                }
            </ul>
        </div>

    )
}

export default BoxRequests;