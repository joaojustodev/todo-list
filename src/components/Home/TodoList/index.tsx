const todoListData = [
  {
    id: 1,
    name: "Fazer café",
    done: false,
  },
  {
    id: 2,
    name: "Fazer coco",
    done: true,
  },
  {
    id: 3,
    name: "Fazer yoga",
    done: false,
  },
];
import styles from "./todolist.module.scss";
import { Check, Trash, X } from "phosphor-react";

const TodoList = () => {
  return (
    <div>
      <div className="containerLg">
        <div className={styles.todolistWrapper}>
          <ul className={styles.todolistList}>
            {todoListData.map((todo) => (
              <li key={todo.id} className={styles.todolistListItem}>
                <div style={{ display: "flex" }}>
                  <div
                    className={`${styles.todolistCheckWrapper} ${
                      todo.done ? styles.done : ""
                    }`}
                  >
                    <span>
                      {todo.done ? <Check aria-hidden size={16} /> : ""}
                    </span>
                  </div>
                  <span>{todo.name}</span>
                </div>

                <button className={styles.todolistTrashWrapper}>
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
