import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileActorCard from "../components/ProfileActorCard";
import ProfileMovieCard from "../components/ProfileMovieCard";
import { myContext } from "./Context";

const Profile = () => {
  const user = useContext(myContext);

  const movieInputRef = useRef();
  const actorInputRef = useRef();

  const [myMovies, setMyMovies] = useState([]);
  const [myActors, setMyActors] = useState([]);

  const getMyMovies = async () => {
    await axios
      .get("http://localhost:4000/mymovies", {
        withCredentials: true,
      })
      .then((res) => {
        setMyMovies(res.data);
        movieInputRef.current.value = "";
      });
  };
  const getMyActors = async () => {
    await axios
      .get("http://localhost:4000/myactors", {
        withCredentials: true,
      })
      .then((res) => {
        setMyActors(res.data);
        actorInputRef.current.value = "";
      });
  };

  const addMovie = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/movies",
        {
          movie_name: movieInputRef.current.value,
          ownerName: user.first_name,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            getMyMovies();
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  const addActor = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/actors",
        {
          actor_name: actorInputRef.current.value,
          ownerName: user.first_name,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            getMyActors();
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  useEffect(() => {
    getMyMovies();
  }, []);

  useEffect(() => {
    getMyActors();
  }, []);

  return (
    <div className="profile_container">
      <div>
        <form className="addForm">
          <div>
            <h2>Add Movie</h2>
          </div>
          <input ref={movieInputRef} type="text" name="movie" required />

          <button onClick={addMovie} className="formBtn">
            Add
          </button>
        </form>
      </div>

      <div className="cards_container">
        {myMovies.map((data) => (
          <ProfileMovieCard
            key={data.id}
            id={data.id}
            movie_name={data.movie_name}
            owner_name={data.ownerName}
          />
        ))}
      </div>

      <div className="actor_container">
        <form className="addForm" onSubmit={addActor}>
          <div>
            <h2>Add Actor</h2>
          </div>
          <input ref={actorInputRef} type="text" name="actor" required />

          <button className="formBtn">Add</button>
        </form>
      </div>
      <div className="cards_container">
        {myActors.map((data) => (
          <ProfileActorCard
            key={data.id}
            id={data.id}
            actor_name={data.actor_name}
            owner_name={data.ownerName}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
