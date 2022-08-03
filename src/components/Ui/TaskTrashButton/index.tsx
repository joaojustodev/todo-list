import * as Popover from "@radix-ui/react-popover";
import { useDeleteTask } from "../../../hooks/useDeleteTask";
import useLocalStorage from "../../../hooks/useLocalStorage";
import styles from "./tasktrashbutton.module.scss";
import { Trash } from "phosphor-react";
import { useEffect, useRef } from "react";

interface TaskTrashButtonProps {
  id: string;
}

const TaskTrashButton = ({ id }: TaskTrashButtonProps) => {
  const { mutate: deteleTask } = useDeleteTask();
  const [hideSecurityMessageStorage, setHideSecurityMessage] = useLocalStorage(
    "hide-trash-security-message",
    false
  );
  const checkboxRef = useRef<HTMLInputElement>(null);

  // NOTE: TODA VEZ QUE O POP-UP FECHA ATIVA ESSA FUNÇÃO
  function handleHideSecurityMessage(popupEvent: Boolean) {
    const checkboxElement = checkboxRef.current;
    // AO FEHCAR O POP-UP ELE VERIFICA SE O CHECK BOX FOI MARCADO PARA ALTERAR ESTA NO LOCAL STORAGE
    if (!popupEvent) {
      if (checkboxElement?.checked) {
        setHideSecurityMessage(!hideSecurityMessageStorage);
      }
    }
  }

  useEffect(() => {
    console.log(hideSecurityMessageStorage);
  }, [hideSecurityMessageStorage]);

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
        <Popover.Root
          onOpenChange={(popupEvent) => handleHideSecurityMessage(popupEvent)}
        >
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
                    ref={checkboxRef}
                    aria-checked={hideSecurityMessageStorage}
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
