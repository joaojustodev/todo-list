import { FormEvent, useRef, useState } from "react";
import { useAddTodo } from "../../../hooks/useAddTodo";
import { CircleNotch, Plus } from "phosphor-react";
import styles from "./addtodo.module.scss";

const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isLoading } = useAddTodo();
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const element = inputRef.current;

    const todo = element?.value as string;

    if (!todo) {
      setError(true);
      return;
    }
    setError(false);

    mutate({ name: todo });
  }

  return (
    <>
      <div className={styles.addTodoBlock}>
        <div className="containerLg">
          <form
            className={styles.addtodoForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.addInputBlock}>
              <input
                className={`${styles.addtodoInput} ${
                  error ? styles.addtodoInputWithError : ""
                }`}
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
                  <CircleNotch
                    aria-hidden
                    color="#fff"
                    size={18}
                    className={styles.headerCircleLoading}
                  />
                ) : (
                  <Plus aria-hidden size={18} color="#fff" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
