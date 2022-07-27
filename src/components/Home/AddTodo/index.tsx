import { FormEvent, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import styles from "./addtodo.module.scss";
import { CircleNotch, Plus } from "phosphor-react";
import { useMutateTodo } from "../../../hooks/useMutateTodo";

const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isLoading } = useMutateTodo();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const element = inputRef.current;

    const todo = element?.value as string;

    if (!todo) {
      // NOTE: DISPARA ERROR PARA USUÁRIO DIGITAR ALGUMA TODO
      return;
    }

    mutate({ name: todo });
  }

  return (
    <div className={styles.addTodoBlock}>
      <div className="containerLg">
        <form className={styles.addtodoForm} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.addInputBlock}>
            <input
              className={styles.addtodoInput}
              ref={inputRef}
              type="text"
              placeholder="Todo name"
            />
            <button
              className={styles.addtodoButton}
              type="submit"
              title="Add todo"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircleNotch aria-hidden size={18} />
              ) : (
                <Plus aria-hidden size={18} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
