import styles from "./avatar.module.scss";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className={styles.avatarBlock}>
      <Image
        src={src}
        alt="User avatar image"
        width={32}
        height={32}
        quality={100}
        placeholder="blur"
        blurDataURL={src}
        onClick={() => signOut()}
      />
    </div>
  );
};

export default Avatar;
