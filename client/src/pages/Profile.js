import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProfileActorCard from "../components/ProfileActorCard";
import ProfileMovieCard from "../components/ProfileMovieCard";
import { myContext } from "./Context";

const Profile = () => {
  const user = useContext(myContext);

  const [movie, setMovie] = useState("");
  const [myMovies, setMyMovies] = useState([]);

  const [actor, setActor] = useState("");
  const [myActors, setMyActors] = useState([]);

  const addMovie = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/movies",
        {
          movie_name: movie,
          ownerName: user.first_name,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            window.location.href = "/profile";
            setMovie("");
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  const addActor = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/actors",
        {
          actor_name: actor,
          ownerName: user.first_name,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            window.location.href = "/profile";
            setMovie("");
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  useEffect(() => {
    const getMyMovies = () => {
      axios
        .get("http://localhost:4000/mymovies", {
          withCredentials: true,
        })
        .then((res) => {
          setMyMovies(res.data);
        });
    };

    getMyMovies();
  }, []);

  useEffect(() => {
    const getMyActors = () => {
      axios
        .get("http://localhost:4000/myactors", {
          withCredentials: true,
        })
        .then((res) => {
          setMyActors(res.data);
        });
    };

    getMyActors();
  }, []);

  return (
    <div className="profile_container">
      <div>
        <form className="addForm" onSubmit={addMovie}>
          <div>
            <h2>Add Movie</h2>
          </div>
          <input
            type="text"
            name="movie"
            onChange={(e) => setMovie(e.target.value)}
            required
          />

          <button className="formBtn">Add</button>
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
          <input
            type="text"
            name="actor"
            onChange={(e) => setActor(e.target.value)}
            required
          />

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
