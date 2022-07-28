import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import AddTodo from "../components/Home/AddTodo";
import TodoList from "../components/Home/TodoList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TodoList - joaojustodev</title>
        <meta name="description" content="Todo list with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main>
        <section>
          <AddTodo />
          <TodoList />
        </section>
      </main>
    </div>
  );
};

export default Home;
