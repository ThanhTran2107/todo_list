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
      title="Update Task"
      open={isOpen}
      closable={!isOpen}
      maskClosable={!isOpen}
      okText="Update"
      cancelText="Cancel"
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
          label="Task Name"
          name="nameField"
          rules={[
            {
              required: true,
              message: 'Please enter the task name to update!',
            },
            {
              type: 'string',
              whitespace: true,
            },
            {
              validator: (_, value) =>
                value && trim(value) === selectedRow.name
                  ? Promise.reject(new Error('The new task name must be different from the old one!'))
                  : Promise.resolve(),
            },
          ]}
        >
          <TextField
            type="text"
            placeholder="Enter a task name..."
            defaultValue={selectedRow.name}
            onChange={() => setHasChanged(true)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
