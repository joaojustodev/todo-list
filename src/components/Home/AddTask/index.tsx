import { FormEvent, useRef, useState } from "react";
import { useAddTask } from "../../../hooks/useAddTask";
import { CircleNotch, Plus } from "phosphor-react";
import styles from "./addtask.module.scss";

const AddTask = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isLoading } = useAddTask();
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
      <div className={styles.addtaskBlock}>
        <div className="containerLg">
          <form
            className={styles.addtaskForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.addtaskInputBlock}>
              <input
                className={`${styles.addtaskInput} ${
                  error ? styles.addtodoInputWithError : ""
                }`}
                ref={inputRef}
                type="text"
                placeholder="Add a task"
              />
              <button
                className={styles.addtaskButton}
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

export default AddTask;
