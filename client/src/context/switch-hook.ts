import { useState, useEffect } from "react";

export const useSwitchHook = () => {
  const [from, setFrom] = useState(null);
  const [item, setItem] = useState(null);
  const [value, setValue] = useState(null);

  const selectItem = (item: any) => {
    setItem(item);
  };
  const selectFrom = (col: any) => {
    setFrom(col);
  };

  const selectValue = (value: any) => {
    setValue(value);
  };

  return {
    from,
    item,
    value,
    selectFrom,
    selectItem,
    selectValue,
  };
};
