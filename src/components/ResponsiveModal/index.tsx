import { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "../../styles/Home.module.css";

interface IModalOptions {
  show: boolean;
  onClose?: () => void;
}

export default function ResponsiveModal({ show, onClose }: IModalOptions) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onOpenModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  const onSubmitProgress = () => console.log("Saving progress...");

  useEffect(() => onOpenModal, [show]);
  useEffect(() => onCloseModal, [onClose]);

  return (
    <div className={styles.card}>
      <h2>Do you want to save your performance?</h2>
      <button className={styles.button} onClick={onOpenModal}>Yes!</button>
      <Modal
        open={showModal}
        onClose={onCloseModal}
      >
        <form className={styles.form} onSubmit={onSubmitProgress}>
          <input className={styles.input} type="text" placeholder="Enter your GitHub profile" />
          <button className={styles.button} type="submit">Save progress</button>
        </form>
      </Modal>
    </div>
  );
}
