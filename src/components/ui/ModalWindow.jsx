import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Button, Modal } from "antd";
import styles from './Modal.module.css'
import { useTranslation } from "react-i18next";

const ModalWindow = forwardRef((props, ref) => {
  const {
    title = "Title", // заголовок по умолчанию
    tag = null, // тег (может быть передан как React-элемент)
    width = 720,
    onClose = () => {},
  } = props;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

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
    onClose();
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
          {t('ModalWindow.returnButton')}
        </Button>,
      ]}
    >
      {/* Отображаем тег/изображение, если он передан */}
      {tag && (
        <div className={styles.modalContainer}>{tag}</div>
      )}
    </Modal>
  );
});

export default ModalWindow;
