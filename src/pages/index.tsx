import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Login from "../components/Login";

const Home = () => {
  return (
    <main>
      <Login />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

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
