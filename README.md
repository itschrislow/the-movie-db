# The Movie Database

This Next.js application utilizes the API from TMDB to discover movies and make bookings along with Tailwind as the CSS framework.

### Getting Started

`yarn dev`

View the live site at https://the-movie-db-gules.vercel.app/

### Documentation

**/**

The homepage maps the MovieCard component which provides an overview of a Movie (includes title, popularity and poster). Movies are loaded 20 at a time when the bottom of the page is reached. Users are able to sort the movies alphabetically, by release date and popularity in ascending or descending order.

**/movie**

The movie details page displays the title, synopsis, genres, average vote, duration, original language and poster of the movie. It also allows the user to book the movie now at the cinema. Users are able to return to the home page by clicking on the back button or the TMDB logo.
