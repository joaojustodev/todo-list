import { FormEvent, useRef } from "react";
import styles from "./addtodo.module.scss";

const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const todo = inputRef.current?.value;

    console.log(todo);
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
            >
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
