import { useContext } from "react";
import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { nextAuthOptions } from "./api/auth/[...nextauth]";
import Header from "../components/Header";
import AddTask from "../components/Tasks/AddTask";
import TaskList from "../components/Tasks/TaskList";
import Popup from "../components/Ui/PopUp";
import { PopUpContext } from "../contexts/PopUpContext";

const Home: NextPage = () => {
  const { data } = useSession();
  const { openPopUp, setOpenPopUp, rolePopUp } = useContext(PopUpContext);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>TodoList - joaojustodev</title>
        <meta name="description" content="Todo list with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header session={data} />
      <main>
        <section>
          <AddTask />
          <TaskList />
        </section>
      </main>
      {openPopUp && (
        <Popup
          state={openPopUp}
          setState={setOpenPopUp}
          type={rolePopUp.type}
          message={rolePopUp.message}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
