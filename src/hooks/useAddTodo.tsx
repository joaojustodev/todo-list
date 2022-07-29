import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const { handleOpenPopUp } = useContext(PopUpContext);

  return useMutation(
    async (newTodo: { name: string }) => {
      const { data } = await api.post("/api/todo/add", newTodo);
      return data;
    },

    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["todos"]);
      },
      onError: () =>
        handleOpenPopUp({
          type: "error",
          message: "Não foi possível criar o todo!",
        }),
      retry: 0,
    }
  );
};
