import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newTodo: { name: string }) => {
      const { data } = await api.post("/api/todo/add", newTodo);
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["todos"]);
      },
    }
  );
};
