import axios from "axios";
import React, { useEffect, useState } from "react";
import SharedMovieCard from "../components/SharedMovieCard";

const MovieList = () => {
  const [sharedMovies, setSharedMovies] = useState([]);

  const getSharedMovies = async () => {
    await axios
      .get("https://gusto-movie-backend.herokuapp.com/sharedmovies", {
        withCredentials: true,
      })
      .then((res) => {
        setSharedMovies(res.data);
      });
  };

  useEffect(() => {
    getSharedMovies();
  }, []);

  return (
    <div className="cards_container">
      {sharedMovies.map((data) => (
        <SharedMovieCard
          key={data.id}
          id={data.id}
          movie_name={data.movie_name}
          owner_name={data.ownerName}
          likeCount={data.likeCount}
          getMovies={getSharedMovies}
        />
      ))}
    </div>
  );
};

export default MovieList;
