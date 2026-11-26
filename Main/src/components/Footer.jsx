function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 p-6 text-center text-xs text-gray-400">
      Data from{" "}
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        TMDB
      </a>
      ,{" "}
      <a
        href="https://rawg.io"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        RAWG
      </a>{" "}
      and{" "}
      <a
        href="https://kitsu.io"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        Kitsu
      </a>
      . This product uses the TMDB API but is not endorsed or certified by TMDB.
    </footer>
  );
}

export default Footer;
