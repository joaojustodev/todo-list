import * as Toast from "@radix-ui/react-toast";
import styles from "./popupsuccess.module.scss";
import { Check } from "phosphor-react";

const PopUpSuccess = ({ message }: { message?: string }) => {
  return (
    <div className={styles.popUpSuccess}>
      <Toast.Title>
        <div className={styles.popUpSuccessTitle}>
          <Check size={22} /> Sucesso
        </div>
      </Toast.Title>
      <Toast.Description>
        {message ? message : "Deu tudo certo!"}
      </Toast.Description>
    </div>
  );
};
export default PopUpSuccess;
