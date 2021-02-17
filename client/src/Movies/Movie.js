import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovieList(movieList.filter((item) => item.id !== Number(id)));
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div
        className="update-button"
        onClick={() => {
          push(`/update-movie/${id}`);
        }}
      >
        Edit
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
