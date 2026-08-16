import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Button, Modal } from "antd";

const ModalWindow = forwardRef((props, ref) => {
  const {
    title = "Title", // заголовок по умолчанию
    tag = null, // тег (может быть передан как React-элемент)
    width = 720,
  } = props;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  }));

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      width={width}
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
      ]}
    >
      {/* Отображаем тег/изображение, если он передан */}
      {tag && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>{tag}</div>
      )}
    </Modal>
  );
});

export default ModalWindow;
