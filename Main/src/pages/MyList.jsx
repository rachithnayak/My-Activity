import { Link } from "react-router-dom";
import { useList } from "../context/ListContext";

function MyList() {
  const { list, removeItem } = useList();

  return (
    <div className="p-4 md:p-8">
      <Link to="/" className="text-sm">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-bold">My List</h1>
      <p className="mb-4">{list.length} titles</p>

      {list.length === 0 && <p>Your list is empty. Find something to add!</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {list.map((item) => (
          <div key={item.id}>
            <Link to={`/movies/${item.id}`}>
              <img
                className="w-full rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${item.poster}`}
                alt={item.title}
              />
              <p className="mt-2 text-sm">{item.title}</p>
            </Link>
            <button
              className="mt-1 text-xs text-red-500"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;
