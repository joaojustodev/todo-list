import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { TodoRepositorie } from "../repositories/todoRepositorie";

interface useDeleteResponse {
  message: string;
  id: string;
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (todo: { id: string }) => {
      const { data } = await api.post<useDeleteResponse>(
        `/api/todo/delete`,
        todo
      );
      return data;
    },
    {
      onSuccess: async (data) => {
        const oldTodos = await queryClient.getQueryData<TodoRepositorie[]>([
          "todos",
        ]);

        const newTodos = oldTodos?.filter((todo) => {
          return todo.id !== data.id;
        });

        await queryClient.setQueryData(["todos"], newTodos);
      },
      retry: false,
    }
  );
};
