import { message, Popconfirm } from "antd";


const PopopConfirm = ({ handleRemoveFromCart }) => {
  const [messageApi, holder] = message.useMessage();

  const onConfirm = async () => {
    await handleRemoveFromCart();
    messageApi.success("Đã xóa khóa học khỏi giỏ");
  };

  return (
    <>
      {holder}
      <Popconfirm
        title="Xóa khóa học"
        description="Bạn chắc chắn muốn xóa khóa học này?"
        onConfirm={onConfirm}
        okText="Xóa"
        cancelText="Hủy"
      >
        <button className="text-sm text-red-500 mt-3 hover:underline">
          Xóa khỏi giỏ
        </button>
      </Popconfirm>
    </>
  );
};

export default PopopConfirm;