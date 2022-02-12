import axios from "axios";
import React, { useEffect, useState } from "react";
import SharedMovieCard from "../components/SharedMovieCard";

const MovieList = () => {
  const [sharedMovies, setSharedMovies] = useState([]);

  useEffect(() => {
    const getSharedMovies = async () => {
     await axios
        .get("http://localhost:4000/sharedmovies", {
          withCredentials: true,
        })
        .then((res) => {
          setSharedMovies(res.data);
        });
    };
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
          likeCount = {data.likeCount}
        />
      ))}
    </div>
  );
};

export default MovieList;
