import Avatar from "../Ui/Avatar";
import type { Session } from "next-auth";
import styles from "./header.module.scss";
import Logo from "../Ui/Logo";

interface HeaderProps {
  session: Session;
}

const Header = ({ session }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className="containerLg">
        <nav className={styles.headerNav}>
          <Logo size={28} />

          <Avatar src={session.user?.image as string} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
