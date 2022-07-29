import { Dispatch, SetStateAction } from "react";
import * as Toast from "@radix-ui/react-toast";

import styles from "./popup.module.scss";
import { WarningCircle, Check } from "phosphor-react";

const PopUpError = ({ message }: { message?: string }) => {
  return (
    <>
      <Toast.Title>
        <div className={styles.popUpTitle}>
          <WarningCircle size={22} /> Error
        </div>
      </Toast.Title>
      <Toast.Description>
        {message ? message : "Ocorreu um error..."}
      </Toast.Description>
    </>
  );
};

const PopUpSuccess = ({ message }: { message?: string }) => {
  return (
    <>
      <Toast.Title>
        <div className={styles.popUpTitle}>
          <Check size={22} /> Sucesso
        </div>
      </Toast.Title>
      <Toast.Description>
        {message ? message : "Deu tudo certo!"}
      </Toast.Description>
    </>
  );
};

interface PopUpProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  type: "success" | "error" | "";
  message?: string;
}

const Popup = ({ setState, state, type, message }: PopUpProps) => {
  return (
    <Toast.Provider>
      <Toast.Viewport className={styles.popUpViewPort}>
        <Toast.Root
          open={state}
          onOpenChange={setState}
          className={
            type === "error" ? styles.popUpRootError : styles.popUpRootSuccess
          }
        >
          {type === "error" ? (
            <PopUpError message={message} />
          ) : (
            <PopUpSuccess message={message} />
          )}
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Provider>
  );
};

export default Popup;
