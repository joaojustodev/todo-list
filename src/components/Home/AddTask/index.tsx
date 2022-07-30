import { FormEvent, useRef, useState } from "react";
import { useAddTask } from "../../../hooks/useAddTask";
import { CircleNotch, Plus } from "phosphor-react";
import styles from "./addtask.module.scss";

const AddTask = () => {
  // @ts-ignore
  const inputRef = useRef<HTMLInputElement>({ value: "" });
  const { mutate, isLoading } = useAddTask();
  const [error, setError] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const element = inputRef?.current;

    const taskName = element.value as string;

    if (taskName === "") {
      setError(true);
      return;
    }

    element.value = "";
    setError(false);
    mutate({ name: taskName });
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
                type="text"
                ref={inputRef}
                placeholder="Add a task"
                autoFocus
                maxLength={60}
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
