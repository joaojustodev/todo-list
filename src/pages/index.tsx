import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { nextAuthOptions } from "./api/auth/[...nextauth]";

const Home = () => {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => alert("Voce não foi autorizado"),
  });
  console.log("DATA:", data);
  console.log("STATUS:", status);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <button type="button" onClick={() => signIn("github")}>
          Fazer Login com github
        </button>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/tasks",
    },
  };
};

export default Home;
