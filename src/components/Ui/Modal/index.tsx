import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.scss";

type ModalProps = {
  open: boolean;
  children: ReactNode;
};

const Modal = ({ open, children }: ModalProps) => (
  <Dialog.Root open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.modalOverlay} />
      <Dialog.Content className={styles.modalContent}>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
