import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [datasForm, setDatasForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatasForm({
      ...datasForm,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const datas = datasForm;
    delete datas.cpassword;
    await axios
      .post("http://localhost:10000/register", datas)
      .then((res) => console.log(datas))
      .catch((error) => console.log(error));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Inscrit toi!</h1>
          <p className="py-6">connecte-toi pour acceder a la messagerie</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom</span>
              </label>
              <input
                type="text"
                name="name"
                value={datasForm.name}
                onChange={handleChange}
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={datasForm.email}
                onChange={handleChange}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={datasForm.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmer</span>
              </label>
              <input
                type="password"
                name="cpassword"
                value={datasForm.cpassword}
                onChange={handleChange}
                placeholder="confirm password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
