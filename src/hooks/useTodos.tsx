import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { TodoRepositorie } from "../repositories/todoRepositorie";

export const useTodos = () => {
  return useQuery(["todos"], async () => {
    const { data } = await api.get<TodoRepositorie[]>("/api/todo/list");

    return data;
  });
};
