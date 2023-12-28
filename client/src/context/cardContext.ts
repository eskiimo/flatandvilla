import { createContext, useContext } from "react";

export const CardContext = createContext({
  from: null,
  item: null,
  value: null,
  setFrom: () => {},
  setItem: () => {},
  setValue: () => {},
});

export function useCardContext() {
  return useContext(CardContext);
}
