import { createContext, useContext } from "react";
import { useSwitchHook } from "./switch-hook";

export const CardContext = createContext({
  from: null,
  to: null,
  item: null,
  value: null,
  setFrom: () => {},
  setTo: () => {},
  setItem: () => {},
  setValue: () => {},
});

export function useCardContext() {
  return useContext(CardContext);
}
