import * as Popover from "@radix-ui/react-popover";
import { useTodos } from "../../../hooks/useTodos";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";
import styles from "./todolist.module.scss";
import { Check, Trash } from "phosphor-react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useState } from "react";

const TodoList = () => {
  const { data, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deteleTodo } = useDeleteTodo();

  // NOTE: VERIFICA SE O POPOVER JA FOI MARCADO COMO TRUE, ASSIM ELE NAO APARECE MAIS A MENSAGEM DE SEGURANÇA
  const [hideTrashMessageStorage, setHideTrashMessageStorage] = useLocalStorage(
    "hide-trash-message",
    false
  );

  //NOTE: STATE DO CHECKBOX DO POPOVER DA LIXEIRA
  const [hideTrashMessageCheckBox, setHideTrashMessageCheckBox] =
    useState<boolean>(false);

  //NOTE: LOADING DOS TODOS
  if (!data || isLoading) {
    return <div>loading...</div>;
  }

  // NOTE:FUNÇÃO QUE VERIFICA QUANDO POPOVER DA LIXEIRA FOR FECHAR E SE O CHECKBOX DO POPOVER PARA ESCONDE-LO ESTÁ FECHADO
  function hideTrashMessage(e: boolean) {
    if (!e) {
      if (hideTrashMessageCheckBox) {
        setHideTrashMessageStorage(!hideTrashMessageStorage);
      }
    }
  }

  return (
    <div>
      <div className="containerLg">
        <div className={styles.todolistWrapper}>
          <ul className={styles.todolistList}>
            {data.map((todo) => (
              <li key={todo.id} className={styles.todolistListItem}>
                <div
                  style={{ display: "flex" }}
                  className="full"
                  onClick={() => updateTodo({ id: todo.id })}
                >
                  <div
                    className={`${styles.todolistCheckWrapper} ${
                      todo.isDone ? styles.todolistCheckWrapperDone : ""
                    }`}
                  >
                    <span>
                      {todo.isDone ? <Check aria-hidden size={16} /> : ""}
                    </span>
                  </div>
                  <span>{todo.name}</span>
                </div>
                {/** NOTE: MELHORAR ACESSIBILIDADE AQUI */}
                {hideTrashMessageStorage ? (
                  <button
                    className={styles.todolistTrashWrapper}
                    type="button"
                    title="Remove todo"
                    onClick={() => deteleTodo({ id: todo.id })}
                  >
                    <Trash aria-hidden size={18} />
                  </button>
                ) : (
                  <Popover.Root onOpenChange={(e) => hideTrashMessage(e)}>
                    <Popover.Trigger
                      title=""
                      aria-labelledby="Click here for remove todo"
                      className={styles.todolistTrashWrapper}
                    >
                      <Trash aria-hidden size={18} />
                    </Popover.Trigger>{" "}
                    <Popover.Portal>
                      <Popover.Content
                        aria-describedby="Remove todo"
                        className={styles.todolistTrashPopoverContent}
                      >
                        <Popover.Arrow aria-hidden />
                        <div
                          className={styles.todolistTrashPopoverContentWrapper}
                        >
                          <span>
                            Tem certeza que deseja excluir esse todo ?
                          </span>
                          <Popover.Close
                            type="button"
                            title="Remove todo"
                            onClick={() => deteleTodo({ id: todo.id })}
                          >
                            Excluir
                          </Popover.Close>
                        </div>
                        <div
                          className={styles.todolistTrashPopoverContentCheckBox}
                        >
                          <input
                            type="checkbox"
                            checked={hideTrashMessageCheckBox}
                            onChange={() =>
                              setHideTrashMessageCheckBox((old) => !old)
                            }
                          />{" "}
                          <span>Não aparecer mais essa mensagem</span>
                        </div>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
