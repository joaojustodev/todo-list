import * as Popover from "@radix-ui/react-popover";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";
import useLocalStorage from "../../../hooks/useLocalStorage";
import styles from "./todotrashbutton.module.scss";
import { Trash } from "phosphor-react";
import { useState } from "react";

interface TodoTrashButtonProps {
  id: string;
}

const ToDoTrashButton = ({ id }: TodoTrashButtonProps) => {
  const { mutate: deteleTodo } = useDeleteTodo();
  const [hideSecurityMessageStorage, setHideSecurityMessage] = useLocalStorage(
    "hide-trash-security-message",
    false
  );
  const [checkboxValue, setCheckBoxValue] = useState<boolean>();

  function handleHideSecurityMessage(e: Boolean) {
    if (!e) {
      if (checkboxValue) {
        setHideSecurityMessage(!hideSecurityMessageStorage);
      }
    }
  }

  return (
    <>
      {hideSecurityMessageStorage ? (
        <button
          className={styles.trashButton}
          type="button"
          title="Remove todo"
          onClick={() => deteleTodo({ id })}
        >
          <Trash aria-hidden size={18} />
        </button>
      ) : (
        <Popover.Root onOpenChange={(e) => handleHideSecurityMessage(e)}>
          <Popover.Trigger
            title=""
            aria-labelledby="Click here for remove todo"
            className={styles.trashButton}
          >
            <Trash aria-hidden />
          </Popover.Trigger>{" "}
          <Popover.Portal>
            <Popover.Content
              aria-describedby="Remove todo"
              className={styles.trashButtonPopoverContentWrapper}
            >
              <Popover.Arrow
                aria-hidden
                className={styles.trashButtonPopoverArrow}
              />
              <div className={styles.trashButtonPopoverContent}>
                <strong>Tem certeza que deseja excluir esse todo ?</strong>
                <Popover.Close
                  type="button"
                  title="Remove todo"
                  aria-label="Remove todo"
                  className="button"
                  onClick={() => deteleTodo({ id })}
                >
                  Excluir
                </Popover.Close>
              </div>
              <div className={styles.trashButtonPopoverCheckBox}>
                <label htmlFor="hideTrashMessage">
                  <input
                    id="hideTrashMessage"
                    type="checkbox"
                    checked={checkboxValue}
                    aria-checked={checkboxValue}
                    onChange={() => setCheckBoxValue((old) => !old)}
                  />{" "}
                  Não aparecer mais essa mensagem.
                </label>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </>
  );
};

export default ToDoTrashButton;
