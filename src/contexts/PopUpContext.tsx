import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export interface PopUpRoleProps {
  type: "error" | "success" | "";
  message?: string;
}

interface PopUpContext {
  openPopUp: boolean;
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
  rolePopUp: PopUpRoleProps;
  handleOpenPopUp: (role: PopUpRoleProps) => void;
}

export const PopUpContext = createContext({} as PopUpContext);

export const PopUpContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [rolePopUp, setRolePopUp] = useState<PopUpRoleProps>({
    type: "",
    message: "",
  });

  function handleOpenPopUp(role: PopUpRoleProps) {
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
