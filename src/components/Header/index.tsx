import Avatar from "../Ui/Avatar";
import type { Session } from "next-auth";
import { CheckSquare } from "phosphor-react";
import styles from "./header.module.scss";

interface HeaderProps {
  session: Session;
}

const Header = ({ session }: HeaderProps) => {
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

          <Avatar src={session.user?.image as string} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
