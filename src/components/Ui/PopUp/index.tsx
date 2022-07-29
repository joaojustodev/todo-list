import { Dispatch, SetStateAction } from "react";
import * as Toast from "@radix-ui/react-toast";
import PopUpError from "../PopUpError";

import styles from "./popup.module.scss";
import { PopUpRoleProps } from "../../../contexts/PopUpContext";
import PopUpSuccess from "../PopUpSuccess";

interface PopUpProps extends PopUpRoleProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ setState, state, type, message }: PopUpProps) => {
  return (
    <Toast.Provider>
      <Toast.Viewport className={styles.popUpViewPort}>
        <Toast.Root
          open={state}
          onOpenChange={setState}
          className={styles.popUpRoot}
        >
          {type === "error" && <PopUpError message={message} />}
          {type === "success" && <PopUpSuccess message={message} />}
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Provider>
  );
};

export default Popup;
