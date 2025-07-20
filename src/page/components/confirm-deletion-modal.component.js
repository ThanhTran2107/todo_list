import { Modal } from './../../components/modal.component';

const { confirm } = Modal;

export const ConfirmDeletionModal = options => {
  const { onOk, title } = options;

  confirm({
    title,
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk,
    ...options,
  });
};
