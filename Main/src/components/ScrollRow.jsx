import { useRef, useEffect } from "react";

function ScrollRow({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    function onWheel(e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return; // let the page scroll at the ends
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={ref} className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
      {children}
    </div>
  );
}

export default ScrollRow;
