import { useState, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useTodos } from "../../../hooks/useTodos";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";
import useLocalStorage from "../../../hooks/useLocalStorage";
import styles from "./todolist.module.scss";
import { Check, Trash } from "phosphor-react";

const TodoList = () => {
  const { data, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deteleTodo } = useDeleteTodo();
  const todoNameRef = useRef<HTMLSpanElement>(null);

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

  function handleUpdateTodo(id: string) {
    updateTodo({ id });
  }

  {
    /** NOTE: MELHORAR ACESSIBILIDADE AQUI */
  }
  return (
    <div>
      <div className="containerLg flexCenter">
        <div className={styles.todolistWrapper}>
          <ul className={styles.todolistList}>
            {data.map((todo) => (
              <li
                key={todo.id}
                tabIndex={1}
                className={styles.todolistListItem}
              >
                <div
                  style={{ display: "flex", width: "100%" }}
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  <span
                    className={`${styles.todolistCheckWrapper} ${
                      todo.isDone ? styles.todolistCheckDoneWrapper : ""
                    }`}
                  >
                    {todo.isDone ? <Check size={16} /> : ""}
                  </span>
                  <span
                    ref={todoNameRef}
                    className={`${styles.todolistListItemName} ${
                      todo.isDone ? styles.todolistListItemNameDone : ""
                    }`}
                  >
                    {todo.name}
                  </span>
                </div>

                {hideTrashMessageStorage ? (
                  <button
                    className={styles.todolistTrashButton}
                    type="button"
                    title="Remove todo"
                    onClick={() => deteleTodo({ id: todo.id })}
                    tabIndex={2}
                  >
                    <Trash aria-hidden size={18} />
                  </button>
                ) : (
                  <Popover.Root onOpenChange={(e) => hideTrashMessage(e)}>
                    <Popover.Trigger
                      title=""
                      aria-labelledby="Click here for remove todo"
                      className={styles.todolistTrashButton}
                      tabIndex={2}
                    >
                      <Trash aria-hidden size={22} />
                    </Popover.Trigger>{" "}
                    <Popover.Portal>
                      <Popover.Content
                        aria-describedby="Remove todo"
                        className={styles.todolistTrashPopoverContentWrapper}
                      >
                        <Popover.Arrow
                          aria-hidden
                          className={styles.todoListTrashPopoverArrow}
                        />
                        <div className={styles.todolistTrashPopoverContent}>
                          <strong>
                            Tem certeza que deseja excluir esse todo ?
                          </strong>
                          <Popover.Close
                            type="button"
                            title="Remove todo"
                            aria-label="Remove todo"
                            className="button"
                            tabIndex={1}
                            onClick={() => deteleTodo({ id: todo.id })}
                          >
                            Excluir
                          </Popover.Close>
                        </div>
                        <div
                          className={styles.todolistTrashPopoverContentCheckBox}
                        >
                          <label htmlFor="hideTrashMessage">
                            <input
                              id="hideTrashMessage"
                              type="checkbox"
                              tabIndex={2}
                              checked={hideTrashMessageCheckBox}
                              aria-checked={hideTrashMessageCheckBox}
                              onChange={() =>
                                setHideTrashMessageCheckBox((old) => !old)
                              }
                            />{" "}
                            Não aparecer mais essa mensagem.
                          </label>
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
