import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "./api/movies";

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  const getDuration = (runtime) => {
    let hours = Math.floor(runtime / 60);
    let mins = runtime % 60;
    return `${hours} h ${mins} m`;
  }

  useEffect(() => {
    api.get(`/movie/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <>
      <div className="mb-4">
        <Link href="/">
          <div className="inline-flex items-center cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            <p className="ml-1 font-medium underline">Back</p>
          </div>
        </Link>
      </div>
      <div className="flex">
        <div className="w-3/4">
          <p className="mb-2 text-4xl font-semibold">
            {movie?.original_title}
          </p>
          {movie?.genres.map(genre => {
            return <Badge key={genre.name} genre={genre.name} />
          })}
          <p className="mt-2">{movie?.overview}</p>
          <br />

          <p className="underline">Rating</p>
          <p>{movie?.vote_average}</p>
          <br />

          <p className="underline">Duration</p>
          <p>{getDuration(movie?.runtime)}</p>
          <br />

          <p className="underline">Original Language</p>
          <p>{movie?.original_language}</p>
        </div>
        <div className="w-1/4 ml-10">
          {movie?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              className="rounded-lg shadow-lg mb-10"
            />
          )}
          <a href="https://www.cathaycineplexes.com.sg/" target="_blank">
            <button className="py-2 w-full bg-yellow-400 hover:bg-yellow-300 text-white font-semibold text-lg rounded-lg shadow-lg transform hover:scale-110 transition duration-200 ease-in-out focus:outline-none">
              Book Now
          </button>
          </a>
        </div>
      </div>
    </>
  )
}

const Badge = ({ genre }) => {
  return (
    <button className="cursor-default mr-2 rounded-xl py-1 px-2 border border-yellow-400 focus:outline-none">
      <p className="text-yellow-400 text-xs">{genre}</p>
    </button>
  )
}

export default MovieDetail;