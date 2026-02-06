

import React from 'react';
import {  Result, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '../../../../components/icons/ArrowRightIcon';
const BoxResult = ({isStatus}) => (
<div>
    {
        isStatus === "loading" ? (
            <div className="flex justify-center items-center h-[300px]">
                <Spin fullscreen size="large" tip="Đang xử lý thanh toán..." />
            </div>
        ) : (
            <Result
                status={isStatus === "success" ? "success" : "error"}
                title={isStatus === "success" ? "Thanh toán thành công!" : "Vui lòng thanh toán lại!"}
                subTitle={`Mã đơn hàng: 2017182818828182881 | Thanh toán: 200.000đ. `}
                className='shadow-lg rounded-2xl bg-white'
                extra={[
                    <div
                        key="checkout-history" 
                        className='flex justify-center flex-col items-center  '>
                        <Link
                            to={`/checkout-history`}
                            className="
                                text-[12px] md:text-[14px] lg:text-[16px] font-semibold flex justify-center border-[1px] border-gray-500 border-dashed
                                    !text-gray-500 rounded-[5px] px-[10px]  items-center h-[40px] !transform !transition-all !duration-300 !ease-in-out 
                                    hover:bg-gray-500 cursor-pointer hover:scale-95 hover:!text-blue-500 hover:!border-blue-500
                            "
                        >
                            <ArrowRightIcon size={20} />
                            Lịch sử khóa học
                        </Link>
                    </div>
                ]}
            />
        )
    }
  </div>

);
export default BoxResult;