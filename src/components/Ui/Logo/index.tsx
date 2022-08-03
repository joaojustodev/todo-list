import { CheckSquare } from "phosphor-react";

import styles from "./logo.module.scss";

interface LogoProps {
  size: number;
}

const Logo = ({ size }: LogoProps) => {
  return (
    <div className={styles.titleWrapper}>
      <h1
        className={styles.title}
        style={{
          fontSize: `calc(${size}px + ((${size} * 2) - 56) * ((100vw - 748px) / (1920 - 748)))`,
        }}
      >
        TodoList
        <CheckSquare aria-hidden size={size - size / 3} />
      </h1>

      <div className={styles.titleRedBlock}></div>
      <div className={styles.titleGreenBlock}></div>
    </div>
  );
};

export default Logo;
