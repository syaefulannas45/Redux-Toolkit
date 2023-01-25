import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, productSelectors, updateProducts } from "../app/features/ProductSlice";

const EditProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => productSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateProducts({ id, ...form }));
    console.log({ id, ...form });
    navigate("/");
  };
  return (
    <div>
      <form className="box mt-5" onSubmit={handleUpdate}>
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

export default EditProduct;
