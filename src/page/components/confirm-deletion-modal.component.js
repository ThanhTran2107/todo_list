import { Modal } from "./../../components/modal.component";

export const ConfirmDeletionModal = (onOk) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn xóa công việc này?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk,
  });
};
