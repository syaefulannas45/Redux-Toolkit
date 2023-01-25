import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productSelectors, deleteProducts } from "../app/features/ProductSlice";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const dispatch = useDispatch();

  const products = useSelector(productSelectors.selectAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  
  return (
    <div className="box mt-5">
      <Link to="/add" className="button is-success">
        Add new
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <td>No</td>
            <td>Title</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.title}</td>
              <td>{data.price}</td>
              <td>
                <Link to={`/edit/${data.id}`} className="button is-info is-small">
                  Edit
                </Link>
                <button className="button is-danger is-small" onClick={() => dispatch(deleteProducts(data.id))}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;
