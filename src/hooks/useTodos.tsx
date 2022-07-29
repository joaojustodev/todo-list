import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";
import { TodoRepositorie } from "../repositories/todoRepositorie";

export const useTodos = () => {
  const { handleOpenPopUp } = useContext(PopUpContext);
  return useQuery(
    ["todos"],
    async () => {
      const { data } = await api.get<TodoRepositorie[]>("/api/todo/list");

      return data;
    },
    {
      onError: () =>
        handleOpenPopUp({
          type: "error",
          message: "Não foi possível busca os todos!",
        }),
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
