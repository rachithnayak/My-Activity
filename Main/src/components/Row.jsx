import { Link } from "react-router-dom";
import Card from "./Card";
import ScrollRow from "./ScrollRow";

function Row({ title, subtitle, items, loading, error, seeAllTo, bar, link }) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`h-6 w-1 rounded ${bar}`} />
          <h2 className="text-2xl font-bold">{title}</h2>
          <span className="hidden text-sm text-gray-400 md:inline">
            {subtitle}
          </span>
        </div>
        <Link to={seeAllTo} className={`text-sm ${link}`}>
          See all →
        </Link>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-gray-400">Could not load: {error}</p>}

      <ScrollRow>
        {items.map((m) => (
          <div key={`${m.type}-${m.id}`} className="w-36 shrink-0 md:w-44">
            <Card item={m} />
          </div>
        ))}
      </ScrollRow>
    </section>
  );
}

export default Row;
