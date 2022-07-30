import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import Header from "../components/Header";
import AddTask from "../components/Home/AddTask";
import TaskList from "../components/Home/TaskList";
import Popup from "../components/Ui/PopUp";
import { PopUpContext } from "../contexts/PopUpContext";

const Home: NextPage = () => {
  const { openPopUp, setOpenPopUp, rolePopUp } = useContext(PopUpContext);
  return (
    <>
      <Head>
        <title>TodoList - joaojustodev</title>
        <meta name="description" content="Todo list with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
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

export default Home;
