import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { handleOpenPopUp } = useContext(PopUpContext);

  return useMutation(
    async (task: { id: string; finished: boolean }) => {
      const { data } = await api.post(`/api/task/update`, task);
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      },
      onError: () =>
        handleOpenPopUp({
          type: "error",
          message: "Não foi possível atualizar a task!",
        }),
      retry: false,
    }
  );
};
