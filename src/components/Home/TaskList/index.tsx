import { useTasks } from "../../../hooks/useTasks";
import { useUpdateTask } from "../../../hooks/useUpdateTask";
import { formatDate } from "../../../utils/formatDate";
import TaskTrashButton from "../../Ui/TaskTrashButton";
import TaskListSkeleton from "../../Ui/Skeletons/TaskListSkeleton";
import styles from "./tasklist.module.scss";
import { CaretDown } from "phosphor-react";
import { toUnicode } from "punycode";

const TaskList = () => {
  const { data, isLoading, isError } = useTasks();
  const { mutate: updateTask } = useUpdateTask();

  function handleUpdateTask(id: string, checked: boolean) {
    updateTask({ id, finished: checked });
  }

  function handleExpandTask(id: string) {
    // PEGAR TASKS AS TASKS
    const allTasks = document.querySelectorAll("li");

    // PEGAR TASK SELICIONADO PARA EXPANDIR
    const task = document.getElementById(id);

    // VERIFICAR SE EXISTE A CLASS PARA EXPANDIR EM ALGUM OUTRO
    allTasks.forEach((value) => {
      if (value !== task) {
        if (value.classList.contains(styles.tasklistListItemExpand)) {
          value.classList.remove(styles.tasklistListItemExpand);
          value
            .querySelector("#expand-task")
            ?.setAttribute("aria-expanded", "false");
        }
      }
    });

    // VERIFICAR SE NO TASK SELECIONADO JA ESTA EXPANDIDO
    if (task?.classList.contains(styles.tasklistListItemExpand)) {
      task.classList.remove(styles.tasklistListItemExpand);
      task
        .querySelector("#expand-task")
        ?.setAttribute("aria-expanded", "false");
      return;
    }

    // EXPANDIR TASK
    task?.classList.add(styles.tasklistListItemExpand);
    task?.querySelector("#expand-task")?.setAttribute("aria-expanded", "true");
  }

  if (!data && isLoading) {
    return <TaskListSkeleton />;
  }

  return (
    <div>
      <div className="containerLg flexCenter">
        <div className={styles.tasklistWrapper}>
          {isError ? (
            ""
          ) : (
            <ul className={styles.tasklistList}>
              {data.map((task) => (
                <li
                  key={task.id}
                  id={task.id}
                  className={`${styles.tasklistListItem}`}
                >
                  <div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "22px 1fr",
                        gridTemplateRows: "1fr",
                        gap: "8px",

                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        name={task.slug}
                        id={`task-${task.id}`}
                        aria-label="Click me for finish task"
                        aria-checked={task.finished}
                        defaultChecked={task.finished}
                        onChange={(e) =>
                          handleUpdateTask(task.id, e.target.checked)
                        }
                        className={styles.tasklistCheckBox}
                      />

                      <label
                        htmlFor={`task-${task.id}`}
                        className={`${styles.tasklistLabelName} ${
                          task.finished ? styles.tasklistLabelNameFinished : ""
                        }`}
                      >
                        {task.name}
                      </label>
                    </div>
                    <div style={{ display: "flex" }}>
                      <TaskTrashButton id={task.id} />
                      <button
                        type="button"
                        id={`expand-task`}
                        title="Expand task"
                        aria-expanded="false"
                        aria-label="Expand task for more informations"
                        onClick={() => handleExpandTask(task.id)}
                        className={styles.tasklistExpandButton}
                      >
                        <CaretDown aria-hidden size={22} />
                      </button>
                    </div>
                  </div>
                  <div className={`${styles.tasklistItemDetails}`}>
                    <div>
                      <span>Created At: {formatDate(task.createdAt)}</span>
                      {task.finished && (
                        <span>Finished At: {formatDate(task.finishedAt)}</span>
                      )}
                    </div>
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

export default TaskList;
