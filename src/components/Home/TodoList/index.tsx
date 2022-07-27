import { useTodos } from "../../../hooks/useTodos";
import styles from "./todolist.module.scss";
import { Check, Trash } from "phosphor-react";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";

const TodoList = () => {
  const { data, isLoading } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deteleTodo } = useDeleteTodo();

  if (!data || isLoading) {
    return <div>loading...</div>;
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

                <button
                  type="button"
                  title="Deletar todo"
                  onClick={() => deteleTodo({ id: todo.id })}
                  className={styles.todolistTrashWrapper}
                >
                  <Trash aria-hidden size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
