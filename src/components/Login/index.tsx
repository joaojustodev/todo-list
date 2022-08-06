import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { PopUpContext } from "../../contexts/PopUpContext";
import PopUp from "../Ui/PopUp";
import Logo from "../Ui/Logo";
import styles from "./login.module.scss";
import { FacebookLogo, GithubLogo, GoogleLogo } from "phosphor-react";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  Unauthorized: "Unauthorized, try signin with a account",
  default: "Unable to sign in.",
};

type ErrorAuthTypes = typeof errors;

type E = keyof ErrorAuthTypes;

const Login = () => {
  const { error } = useRouter().query as { error: E };
  const { openPopUp } = useContext(PopUpContext);

  const errorMessage = error && (errors[error] ?? errors.default);

  useEffect(() => {
    if (errorMessage) {
      openPopUp && openPopUp("error", errorMessage);
    }
  }, [openPopUp, errorMessage]);

  return (
    <>
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
                className={styles.loginSocialGoogle}
                onClick={() => signIn("google")}
              >
                <GoogleLogo />
                Google
              </button>
            </div>
          </div>
        </div>
      </section>
      <PopUp />
    </>
  );
};

export default Login;
