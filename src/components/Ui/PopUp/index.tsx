import { useContext } from "react";
import { PopUpContext, POPUP_VIEW } from "../../../contexts/PopUpContext";
import Popup from "./PopUp";

const PopUpRoot = () => {
  const { displayPopUp, closePopUp, setPopUpMessage, setPopUpView } =
    useContext(PopUpContext);
  return (
    <Popup
      state={displayPopUp}
      setState={closePopUp}
      view={setPopUpView as POPUP_VIEW}
      message={setPopUpMessage}
    />
  );
};

export default PopUpRoot;
