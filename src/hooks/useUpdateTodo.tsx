import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (todo: { id: string }) => {
      const { data } = await api.post(`/api/todo/update`, todo);
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["todos"]);
      },
      retry: false,
    }
  );
};
