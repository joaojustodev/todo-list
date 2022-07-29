import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface PopUpRoleDTO {
  type: "error" | "success" | "";
  message?: string;
}

interface PopUpContext {
  openPopUp: boolean;
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
  rolePopUp: PopUpRoleDTO;
  handleOpenPopUp: (role: PopUpRoleDTO) => void;
}

export const PopUpContext = createContext({} as PopUpContext);

export const PopUpContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [rolePopUp, setRolePopUp] = useState<PopUpRoleDTO>({
    type: "",
    message: "",
  });

  function handleOpenPopUp(role: PopUpRoleDTO) {
    setOpenPopUp(true);
    setRolePopUp(role);
  }

  return (
    <PopUpContext.Provider
      value={{ openPopUp, rolePopUp, handleOpenPopUp, setOpenPopUp }}
    >
      {children}
    </PopUpContext.Provider>
  );
};
