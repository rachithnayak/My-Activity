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

  function removeItem(id) {
    setList((prev) => prev.filter((i) => i.id !== id));
  }

  function isInList(id) {
    return list.some((i) => i.id === id);
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
