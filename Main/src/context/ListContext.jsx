import { createContext, useContext, useState, useEffect } from "react";

const ListContext = createContext();

export function ListProvider({ children }) {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
  }, [list]);

  function addItem(item) {
    setList((prev) => [...prev, item]);
  }

  function removeItem(id, type) {
    setList((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  }

  function isInList(id, type) {
    return list.some((i) => i.id === id && i.type === type);
  }

  return (
    <ListContext.Provider value={{ list, addItem, removeItem, isInList }}>
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  return useContext(ListContext);
}
