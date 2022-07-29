import { useTodos } from "../../../hooks/useTodos";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import styles from "./todolist.module.scss";
import { Check } from "phosphor-react";
import ToDoTrashButton from "../../Ui/ToDoTrashButton";
import TodoListSkeleton from "../../Ui/Skeletons/TodoListSkeleton";

const TodoList = () => {
  const { data, isLoading, isError } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();

  function handleUpdateTodo(id: string) {
    updateTodo({ id });
  }

  if (!data && isLoading) {
    return <TodoListSkeleton />;
  }

  {
    /** NOTE: MELHORAR ACESSIBILIDADE AQUI */
  }
  return (
    <div>
      <div className="containerLg flexCenter">
        <div className={styles.todolistWrapper}>
          {isError ? (
            ""
          ) : (
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
                      className={`${styles.todolistListItemName} ${
                        todo.isDone ? styles.todolistListItemNameDone : ""
                      }`}
                    >
                      {todo.name}
                    </span>
                  </div>
                  <ToDoTrashButton id={todo.id} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
