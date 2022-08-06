import { Dispatch, SetStateAction } from "react";
import * as Toast from "@radix-ui/react-toast";
import { POPUP_VIEW } from "../../../contexts/PopUpContext";
import PopUpError from "./PopUpError";
import PopUpSuccess from "./PopUpSuccess";

import styles from "./popup.module.scss";

interface PopUpProps {
  state: boolean;
  setState: () => void;
  view: POPUP_VIEW;
  message: string;
}

const Popup = ({ setState, state, view, message }: PopUpProps) => {
  return (
    <Toast.Provider>
      <Toast.Viewport className={styles.popUpViewPort}>
        <Toast.Root
          open={state}
          onOpenChange={setState}
          className={styles.popUpRoot}
        >
          {view === "error" && <PopUpError message={message} />}
          {view === "success" && <PopUpSuccess message={message} />}
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Provider>
  );
};

export default Popup;
