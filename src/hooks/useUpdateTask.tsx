import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { openPopUp } = useContext(PopUpContext);

  return useMutation(
    async (task: { id: string; isFinished: boolean }) => {
      const { data } = await api.post(`/api/task/update`, task);
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      },
      onError: () => openPopUp && openPopUp("error", "Cannot finish the task"),
      retry: false,
    }
  );
};
