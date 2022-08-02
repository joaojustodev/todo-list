import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { nextAuthOptions } from "./api/auth/[...nextauth]";
import Login from "../components/Login";

const Home = () => {
  return (
    <main>
      <Login />
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
