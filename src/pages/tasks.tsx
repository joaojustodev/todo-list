import Head from "next/head";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import Header from "../components/Header";
import AddTask from "../components/Tasks/AddTask";
import TaskList from "../components/Tasks/TaskList";
import WithAuth from "../components/Auth/WithAuth";

interface TasksProps {
  session: Session;
}

const Tasks = ({ session }: TasksProps) => {
  return (
    <>
      <Head>
        <title>TodoList - joaojustodev</title>
        <meta name="description" content="Todo list with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header session={session} />
      <main>
        <section>
          <AddTask />
          <TaskList />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

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

export default WithAuth(Tasks);
