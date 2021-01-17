import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky top-0 z-10 flex px-4 py-2 w-full shadow-md justify-center items-center bg-yellow-300">
        <Link href="/">
          <button className="p-1 font-bold text-4xl text-yellow-300 bg-black rounded-lg focus:outline-none">
            TMDB
        </button>
        </Link>
      </div>
      <div className="p-10 pt-5">
        {children}
      </div>
    </div>
  )
}

export default Layout;