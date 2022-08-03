import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";
import isBrowser from "../utils/isBrowser";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

// Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const readValue = useCallback((): T => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (!isBrowser) {
        throw new Error("The document has not loaded");
      }

      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
      return value;
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  useEventListener("storage", handleStorageChange);
  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
