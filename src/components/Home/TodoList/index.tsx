import { useTodos } from "../../../hooks/useTodos";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { formatDate } from "../../../utils/formatDate";
import ToDoTrashButton from "../../Ui/ToDoTrashButton";
import TodoListSkeleton from "../../Ui/Skeletons/TodoListSkeleton";
import styles from "./todolist.module.scss";
import { CaretDown } from "phosphor-react";

const TodoList = () => {
  const { data, isLoading, isError } = useTodos();
  const { mutate: updateTodo } = useUpdateTodo();

  function handleUpdateTodo(id: string, checked: boolean) {
    updateTodo({ id, finished: checked });
  }

  function handleExpandTodo(id: string) {
    // PEGAR TODOS AS TASKS
    const allTodos = document.querySelectorAll("li");

    // PEGAR TASK SELICIONADO PARA EXPANDIR
    const todo = document.getElementById(id);

    // VERIFICAR SE EXISTE A CLASS PARA EXPANDIR EM ALGUM OUTRO
    allTodos.forEach((value) => {
      if (value !== todo) {
        if (value.classList.contains(styles.todolistListItemExpand)) {
          value.classList.remove(styles.todolistListItemExpand);
          value
            .querySelector("#expand-task")
            ?.setAttribute("aria-expanded", "false");
        }
      }
    });

    // VERIFICAR SE NO TODO SELECIONADO JA ESTA EXPANDIDO
    if (todo?.classList.contains(styles.todolistListItemExpand)) {
      todo.classList.remove(styles.todolistListItemExpand);
      todo
        .querySelector("#expand-task")
        ?.setAttribute("aria-expanded", "false");
      return;
    }

    // EXPANDIR TODO
    todo?.classList.add(styles.todolistListItemExpand);
    todo?.querySelector("#expand-task")?.setAttribute("aria-expanded", "true");
  }

  if (!data && isLoading) {
    return <TodoListSkeleton />;
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
                  id={todo.id}
                  className={`${styles.todolistListItem}`}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <input
                        type="checkbox"
                        name={todo.slug}
                        id={`task-${todo.id}`}
                        aria-label="Click me for finish task"
                        aria-checked={todo.isDone}
                        defaultChecked={todo.isDone}
                        onChange={(e) =>
                          handleUpdateTodo(todo.id, e.target.checked)
                        }
                        className={styles.todolistCheckBox}
                      />

                      <label
                        htmlFor={`task-${todo.id}`}
                        className={`${styles.todolistLabelName} ${
                          todo.isDone ? styles.todolistListItemNameDone : ""
                        }`}
                      >
                        {todo.name}
                      </label>
                    </div>
                    <div style={{ display: "flex" }}>
                      <ToDoTrashButton id={todo.id} />
                      <button
                        type="button"
                        id={`expand-task`}
                        title="Expand task"
                        aria-expanded="false"
                        aria-label="Expand todo for more informations"
                        onClick={() => handleExpandTodo(todo.id)}
                        className={styles.todolistExpandButton}
                      >
                        <CaretDown aria-hidden size={22} />
                      </button>
                    </div>
                  </div>
                  <div className={`${styles.todolistItemDetails}`}>
                    <span>Created At: {formatDate(todo.createdAt)}</span>
                  </div>
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
