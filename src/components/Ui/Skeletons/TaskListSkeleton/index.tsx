import styles from "./tasklistskeleton.module.scss";

const TaskListSkeleton = () => {
  return (
    <div>
      <div className="containerLg flexCenter">
        <div className={styles.tasklistSkeletonWrapper}>
          <div className={styles.tasklistSkeleton}>
            <div className={styles.tasklistItemSkeleton}></div>
            <div className={styles.tasklistItemSkeleton}></div>
            <div className={styles.tasklistItemSkeleton}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListSkeleton;
