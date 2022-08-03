import { signIn } from "next-auth/react";
import Logo from "../Ui/Logo";
import styles from "./login.module.scss";
import { FacebookLogo, GithubLogo, GoogleLogo } from "phosphor-react";

const Login = () => {
  return (
    <section className={styles.loginBlock}>
      <div className={styles.loginLeftSide}>
        <Logo size={56} />
      </div>

      <div className={styles.loginRightSide}>
        <div className={styles.loginLogoWrapper}>
          <Logo size={56} />
        </div>
        <div className={styles.loginWrapper}>
          <h2>Connect with</h2>

          <div className={styles.loginSocialWrapper}>
            <button
              type="button"
              title="Connect with github account"
              className={styles.loginSocialGithub}
              onClick={() => signIn("github")}
            >
              <GithubLogo aria-hidden />
              <span>Github</span>
            </button>
            <button
              type="button"
              title="Connect with facebook account"
              onClick={() => signIn("facebook")}
              className={styles.loginSocialFacebook}
            >
              <FacebookLogo />
              Facebook
            </button>
            <button
              type="button"
              title="Connect with google account"
              disabled
              aria-disabled
              className={styles.loginSocialGoogle}
            >
              <GoogleLogo />
              Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
