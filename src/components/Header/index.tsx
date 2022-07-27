import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="containerLg">
        <div>
          <h1>Todo list</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
