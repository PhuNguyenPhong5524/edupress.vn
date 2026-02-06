

import React from 'react';
import {  Result, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '../../../../components/icons/ArrowRightIcon';
const BoxResult = ({isStatus}) => (
<div>
    {
        isStatus === "loading" ? (
            <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" fullscreen tip="Đang xử lý thanh toán..." />
            </div>
        ) : (
            <Result
            status={
                isStatus === "success" || isStatus === "already_paid"
                ? "success"
                : "error"
            }
            title={
                isStatus === "success"
                ? "Thanh toán thành công!"
                : isStatus === "already_paid"
                ? "Đơn hàng đã được thanh toán trước đó"
                : "Thanh toán không thành công"
            }
            subTitle={
                isStatus === "success"
                ? "Cảm ơn bạn đã mua khóa học."
                : isStatus === "already_paid"
                ? "Bạn không cần thanh toán lại đơn hàng này."
                : "Vui lòng thử lại hoặc tạo đơn hàng mới."
            }
            className="shadow-lg rounded-2xl bg-white"
            extra={[
                <div
                key="checkout-history"
                className="flex justify-center flex-col items-center"
                >
                <Link
                    to="/checkout-history"
                    className="
                    text-[12px] md:text-[14px] lg:text-[16px] font-semibold
                    flex justify-center items-center
                    border border-gray-500 border-dashed
                    text-gray-500 rounded-[5px] px-[10px] h-[40px]
                    transition-all duration-300 ease-in-out
                    hover:bg-gray-500 hover:text-blue-500 hover:border-blue-500
                    hover:scale-95
                    "
                >
                    <ArrowRightIcon size={20} />
                    Lịch sử khóa học
                </Link>
                </div>,
            ]}
            />
        )
    }

  </div>

);
export default BoxResult;