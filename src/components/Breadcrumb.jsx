
import ChevronRightIcon  from "../components/icons/ChevronRightIcon";


const Breadcrumb = ({nameCate, showList}) => {
    return (
        <div className="bg-[#F5F5F5] w-full h-auto">
            <div className="max-w-[1080px] mx-auto py-[15px] relative">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <div className="flex items-center space-x-1.5">
                                <span className="currentCate inline-flex items-center text-sm font-medium text-[#adadad]">{nameCate}</span>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center space-x-1.5">
                                <ChevronRightIcon size={20} />
                                {
                                    showList && (
                                        <span className="text-sm font-medium ">{showList.course_title}</span>
                                    )
                                }
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default Breadcrumb;