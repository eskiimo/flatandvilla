import { useSwitchHook } from "./context/switch-hook";
import { CardContext } from "./context/cardContext";
import Home from "./home";

function App() {
  const { from, item, value, selectFrom, selectItem, selectValue } =
    useSwitchHook();

  return (
    <CardContext.Provider
      value={{
        from: from,
        item: item,
        value: value,
        setValue: selectValue,
        setFrom: selectFrom,
        setItem: selectItem,
      }}
    >
      <Home />
    </CardContext.Provider>
  );
}

export default App;
