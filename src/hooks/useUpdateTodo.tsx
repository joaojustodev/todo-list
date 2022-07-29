import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { handleOpenPopUp } = useContext(PopUpContext);

  return useMutation(
    async (todo: { id: string }) => {
      const { data } = await api.post(`/api/todo/update`, todo);
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["todos"]);
      },
      onError: () =>
        handleOpenPopUp({
          type: "error",
          message: "Não foi possível atualizar o todo!",
        }),
      retry: false,
    }
  );
};
