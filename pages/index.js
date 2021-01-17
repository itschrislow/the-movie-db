import Link from "next/link";
import { useEffect, useState } from "react";
import api from "./api/movies";

const Home = () => {
  const [page, setPage] = useState(1);
  const [isTop, setIsTop] = useState(true);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [sortBy, setSortBy] = useState("release_date.desc");
  const SORT_OPTIONS = [
    { label: "Release Date (Desc)", value: "release_date.desc" },
    { label: "Release Date (Asc)", value: "release_date.asc" },
    { label: "Alphabetical (Desc)", value: "original_title.desc" },
    { label: "Alphabetical (Asc)", value: "original_title.asc" },
    { label: "Rating (Desc)", value: "vote_average.desc" },
    { label: "Rating (Asc)", value: "vote_average.asc" },
  ]

  const handleSortBy = (sortByValue) => {
    setMovies([]);
    setPage(1);
    setSortBy(sortByValue);
  }

  const scrollToTop = () => {
    window?.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollPos(0);
  }

  useEffect(() => {
    const onScroll = () => {
      // LOAD MORE MOVIE IF NEAR BOTTOM OF PAGE
      const currScrollPos = Math.round(window.innerHeight + window.pageYOffset) + 10;
      if (currScrollPos >= document.body.offsetHeight) {
        setPage(page + 1);
        setScrollPos(currScrollPos);
      }
      // SHOW SCROLL TO TOP BUTTON IF NOT AT TOP OF PAGE
      if (window.pageYOffset) setIsTop(false);
      else setIsTop(true);
    }
    window?.addEventListener("scroll", onScroll);
    return () => window?.removeEventListener("scroll", onScroll);
  }, [scrollPos])

  useEffect(() => {
    setLoading(true);
    api.get("/discover/movie", {
      params: {
        sort_by: sortBy,
        page: page
      }
    })
      .then(res => {
        setLoading(false);
        for (let movie of res.data.results) movies.push(movie);
        setMovies(movies.slice());
      })
      .catch(err => console.log(err))
  }, [sortBy, page])

  return (
    <>
      {/* SORT BY FILTER */}
      <div className="mb-5 flex items-center justify-center">
        <select
          onChange={(event) => handleSortBy(event.target.value)}
          className="px-2 py-1 cursor-pointer underline rounded-lg shadow-md focus:outline-none"
        >
          {SORT_OPTIONS.map((option, index) => {
            return (
              <option key={index} value={option.value}>{option.label}</option>
            )
          })}
        </select>
      </div>
      {/* MOVIE CARDS */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies?.map((movie, index) => {
          return <MovieCard key={index} movie={movie} />
        })}
      </div>
      {/* LOADER */}
      {loading && (
        <div className="inline-flex w-full items-center justify-center text-center mt-10 text-gray-400">
          <svg className="w-6 h-6 animate-spin" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
          <p className="ml-2">Loading...</p>
        </div>
      )}
      {/* SCROLL TO TOP */}
      {!isTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-10 p-2 rounded-full shadow-lg bg-white text-gray-600 focus:outline-none"
        >
          <svg className="w-10 h-10 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        </button>
      )}
    </>
  )
}

const MovieCard = (props) => {
  const { movie } = props;
  return (
    <Link href={{ pathname: "/movie", query: { id: movie?.id } }}>
      <div className="cursor-pointer">
        {movie?.poster_path ?
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              className="mb-4 rounded-lg shadow-lg transform transition hover:scale-105 ease-in-out duration-300"
            />
            <p className="text-center font-medium">{movie?.title}</p>
            <p className="text-center text-xs">Popularity: {movie?.popularity}</p>
          </>
          :
          <div className="flex flex-col h-full p-2 bg-gray-300 shadow-lg text-center text-white text-xl font-bold rounded-lg items-center justify-center hover:bg-gray-200 hover:text-gray-600 transition ease-in-out duration-500">
            <p>{movie?.title}</p>
            <p className="text-xs">Popularity: {movie?.popularity}</p>
          </div>
        }
      </div>
    </Link >
  )
}

export default Home;