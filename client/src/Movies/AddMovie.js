import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddMovie = ({ setMovieList }) => {
  const [form, setForm] = useState(initialState);

  const { push } = useHistory();

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      ...form,
      stars: form.stars.split(","),
    };
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then((res) => {
        console.log(res);
        setMovieList(res.data);
        push(`/`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          placeholder="title"
          name="title"
          value={form.title}
          onChange={changeHandler}
        />
        <input
          placeholder="director"
          name="director"
          value={form.director}
          onChange={changeHandler}
        />
        <input
          placeholder="metascore"
          name="metascore"
          value={form.metascore}
          onChange={changeHandler}
        />
        <input
          placeholder="stars"
          name="stars"
          value={form.stars}
          onChange={changeHandler}
        />
        <button>Update Movie</button>
      </form>
    </>
  );
};

export default AddMovie;
