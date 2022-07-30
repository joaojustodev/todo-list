import * as Popover from "@radix-ui/react-popover";
import { useDeleteTask } from "../../../hooks/useDeleteTask";
import useLocalStorage from "../../../hooks/useLocalStorage";
import styles from "./tasktrashbutton.module.scss";
import { Trash } from "phosphor-react";
import { useState } from "react";

interface TaskTrashButtonProps {
  id: string;
}

const TaskTrashButton = ({ id }: TaskTrashButtonProps) => {
  const { mutate: deteleTask } = useDeleteTask();
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
  //NOTE: VERIFICAR ACESSIBILIDADE AQUI

  return (
    <>
      {hideSecurityMessageStorage ? (
        <button
          className={styles.trashButton}
          type="button"
          title="Remove task"
          onClick={() => deteleTask({ id })}
        >
          <Trash aria-hidden size={18} />
        </button>
      ) : (
        <Popover.Root onOpenChange={(e) => handleHideSecurityMessage(e)}>
          <Popover.Trigger
            title=""
            aria-labelledby="Click here for remove task"
            className={styles.trashButton}
          >
            <Trash aria-hidden />
          </Popover.Trigger>{" "}
          <Popover.Portal>
            <Popover.Content
              aria-describedby="Remove task"
              className={styles.trashButtonPopoverContentWrapper}
            >
              <Popover.Arrow
                aria-hidden
                className={styles.trashButtonPopoverArrow}
              />
              <div className={styles.trashButtonPopoverContent}>
                <strong>Tem certeza que deseja excluir essa task ?</strong>
                <Popover.Close
                  type="button"
                  title="Remove task"
                  aria-label="Remove task"
                  className="button"
                  onClick={() => deteleTask({ id })}
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

export default TaskTrashButton;
