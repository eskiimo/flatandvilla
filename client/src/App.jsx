import { useSwitchHook } from "./context/switch-hook";
import { CardContext } from "./context/cardContext";
import Home from "./home";

function App() {
  const {
    from,
    to,
    item,
    value,
    selectFrom,
    selectItem,
    selectTo,
    selectValue,
  } = useSwitchHook();

  return (
    <CardContext.Provider
      value={{
        from: from,
        to: to,
        item: item,
        value: value,
        setValue: selectValue,
        setFrom: selectFrom,
        setTo: selectTo,
        setItem: selectItem,
      }}
    >
      <Home />
    </CardContext.Provider>
  );
}

export default App;
