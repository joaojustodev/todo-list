import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { PopUpContext } from "../contexts/PopUpContext";
import { api } from "../lib/api";
import { TaskRepositorie } from "../repositories/taskRepositorie";

export const useTasks = () => {
  const { openPopUp } = useContext(PopUpContext);
  return useQuery(
    ["tasks"],
    async () => {
      const { data } = await api.get<TaskRepositorie[]>("/api/task/list");

      return data;
    },
    {
      onError: () =>
        openPopUp && openPopUp("error", "Cannot possible fetch your tasks!"),
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
