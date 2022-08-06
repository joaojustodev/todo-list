import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
} from "react";

interface State {
  displayPopUp: boolean;
  setPopUpView: string;
  setPopUpMessage: string;
  openPopUp?: (view: POPUP_VIEW, message: string) => void;
  closePopUp?: () => void;
}

const initialState = {
  displayPopUp: false,
  setPopUpView: "",
  setPopUpMessage: "",
};

export type POPUP_VIEW = "error" | "success";

type Action =
  | {
      type: "OPEN_POPUP";
      view: POPUP_VIEW;
      message: string;
    }
  | {
      type: "CLOSE_POPUP";
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "OPEN_POPUP":
      return {
        ...state,
        displayPopUp: true,
        setPopUpView: action.view,
        setPopUpMessage: action.message,
      };
    case "CLOSE_POPUP":
      return {
        ...state,
        displayPopUp: false,
      };
  }
};

export const PopUpContext = createContext({} as State);

export const PopUpProvider: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openPopUp = useCallback(
    (view: POPUP_VIEW, message: string) => {
      dispatch({ type: "OPEN_POPUP", view, message });
    },
    [dispatch]
  );

  const closePopUp = useCallback(() => {
    dispatch({ type: "CLOSE_POPUP" });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      openPopUp,
      closePopUp,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return (
    <PopUpContext.Provider value={value} {...props}>
      {children}
    </PopUpContext.Provider>
  );
};
