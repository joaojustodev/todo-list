import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";
import { TaskRepositorie } from "../repositories/taskRepositorie";

interface useDeleteResponse {
  message: string;
  id: string;
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { openPopUp } = useContext(PopUpContext);

  return useMutation(
    async (todo: { id: string }) => {
      const { data } = await api.post<useDeleteResponse>(
        `/api/task/delete`,
        todo
      );
      return data;
    },
    {
      onSuccess: async (data) => {
        const oldTasks = await queryClient.getQueryData<TaskRepositorie[]>([
          "tasks",
        ]);

        const newTasks = oldTasks?.filter((task) => {
          return task.id !== data.id;
        });

        await queryClient.setQueryData(["tasks"], newTasks);
      },
      onError: () => openPopUp && openPopUp("error", "Cannot delete the task!"),
      retry: false,
    }
  );
};
