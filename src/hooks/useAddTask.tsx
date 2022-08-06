import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const { openPopUp } = useContext(PopUpContext);

  return useMutation(
    async (newTodo: { name: string }) => {
      const { data } = await api.post("/api/task/add", newTodo);
      return data;
    },

    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      },
      onError: () => {
        openPopUp && openPopUp("error", "Cannot possible add the task!");
      },

      retry: false,
    }
  );
};
