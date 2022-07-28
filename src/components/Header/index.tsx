import { CheckSquare } from "phosphor-react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="containerLg">
        <nav className={styles.headerNav}>
          <div className={styles.headerTitleWrapper}>
            <h1 className={styles.headerTitle}>
              TodoList
              <span>
                <CheckSquare aria-hidden size={28} />
              </span>
            </h1>

            <div className={styles.headerTitleRedBlock}></div>
            <div className={styles.headerTitleGreenBlock}></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
