import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = (props) => {
  const [form, setForm] = useState(initialState);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) =>
        console.error(`unable to get item: ${id}: `, err.message)
      );
  }, []);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, form)
      .then((res) => {
        console.log(res);
        props.setMovieList(res.data);
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
        {/* <input
          placeholder="stars"
          name="stars"
          value={form.stars}
          onChange={changeHandler}
        /> */}
        <button>Update Movie</button>
      </form>
    </>
  );
};

export default UpdateForm;
