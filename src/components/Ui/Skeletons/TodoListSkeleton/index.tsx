import styles from "./todolistskeleton.module.scss";

const TodoListSkeleton = () => {
  return (
    <div>
      <div className="containerLg flexCenter">
        <div className={styles.todolistSkeletonWrapper}>
          <div className={styles.todolistSkeleton}>
            <div className={styles.todolistItemSkeleton}></div>
            <div className={styles.todolistItemSkeleton}></div>
            <div className={styles.todolistItemSkeleton}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListSkeleton;
