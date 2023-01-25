import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProducts } from "../app/features/ProductSlice";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProduct = async (e) => {
    e.preventDefault();
    await dispatch(saveProducts({ ...form }));
    navigate("/");
  };

  return (
    <div>
      <form className="box mt-5" onSubmit={createProduct}>
        <div className="field">
          <label htmlFor="" className="label">
            Title
          </label>
          <div className="control">
            <input type="text" className="input" placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} name="title" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Price
          </label>
          <div className="control">
            <input type="text" className="input" placeholder="price" value={form.price} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} name="price" />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Tambah</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
