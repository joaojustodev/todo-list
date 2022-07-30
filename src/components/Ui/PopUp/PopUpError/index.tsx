import * as Toast from "@radix-ui/react-toast";
import styles from "./popuperror.module.scss";
import { WarningCircle } from "phosphor-react";

const PopUpError = ({ message }: { message?: string }) => {
  return (
    <div className={styles.popUpError}>
      <Toast.Title>
        <div className={styles.popUpErrorTitle}>
          <WarningCircle size={22} /> Error
        </div>
      </Toast.Title>
      <Toast.Description>
        {message ? message : "Ocorreu um error..."}
      </Toast.Description>
    </div>
  );
};
export default PopUpError;
