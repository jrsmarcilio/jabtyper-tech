import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "../../styles/Home.module.css";
import { IModalOptions, InputsSaveProgress } from '../../utils/Types'
import { api } from "../../service";

export default function ModalSaveProgress({ show, onClose, wps }: IModalOptions) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const onOpenModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<InputsSaveProgress>();

  const onSubmitProgress: SubmitHandler<InputsSaveProgress> = async data => {
    const response = await api.post(`/ranking`, data);
    console.log(response);
    onCloseModal();
  }

  useEffect(() => setValue("wps", wps), [setValue, wps]);
  useEffect(() => onOpenModal, [show]);
  useEffect(() => onCloseModal, [onClose]);

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ width: '100%' }}>
        <h2>Do you want to save your performance?</h2>
        <button className={styles.button} onClick={onOpenModal}>Yes!</button>
        <Modal
          open={showModal}
          onClose={onCloseModal}
          center
        >
          <form className={styles.form} onSubmit={handleSubmit(onSubmitProgress)}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your GitHub profile"
              {...register("username")}
            />
            <button className={styles.button} type="submit">Save progress</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
