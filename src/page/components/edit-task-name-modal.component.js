import { trim } from 'lodash-es';
import { useState } from 'react';

import { TextField } from '../../components/text-field.component';
import { Form } from './../../components/form.component';
import { Modal } from './../../components/modal.component';

export const EditTaskNameModal = ({ isOpen, selectedRow, onUpdateTaskName, onCloseEditModal }) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [form] = Form.useForm();

  const handleUpdateButtonClick = selectedRow => {
    form
      .validateFields()
      .then(formValue => {
        const { nameField } = formValue;
        const updatedTaskName = { ...selectedRow, name: trim(nameField) };

        onUpdateTaskName(updatedTaskName);
        onCloseEditModal();
      })
      .catch(e => {
        if (e.errorFields) return;

        console.log(e);
      });
  };

  return (
    <Modal
      title="Cập Nhật Công Việc"
      open={isOpen}
      closable={!isOpen}
      maskClosable={!isOpen}
      okText="Cập nhật"
      cancelText="Hủy"
      onOk={() => handleUpdateButtonClick(selectedRow)}
      onCancel={onCloseEditModal}
      okButtonProps={{ disabled: !hasChanged }}
    >
      <Form
        form={form}
        name="editTaskForm"
        layout="vertical"
        onFinish={() => handleUpdateButtonClick(selectedRow)}
        style={{ marginTop: '1.5rem' }}
      >
        <Form.Item
          label="Tên công việc"
          name="nameField"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên công việc cần cập nhật!',
            },
            {
              type: 'string',
              whitespace: true,
            },
            {
              validator: (_, value) =>
                value && trim(value) === selectedRow.name
                  ? Promise.reject(new Error('Tên công việc mới phải khác với tên cũ!'))
                  : Promise.resolve(),
            },
          ]}
        >
          <TextField
            type="text"
            placeholder="Nhập tên công việc..."
            defaultValue={selectedRow.name}
            onChange={() => setHasChanged(true)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
