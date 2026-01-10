import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./EditProductPage.css";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isDiscountTab = new URLSearchParams(location.search).get("tab") === "discount";

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    discountPercent: 0,
    discountStart: "",
    discountEnd: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          ...data,
          discountStart: data.discountStart ? data.discountStart.slice(0, 16) : "",
          discountEnd: data.discountEnd ? data.discountEnd.slice(0, 16) : "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send only required fields
    const payload = isDiscountTab
      ? {
          discountPercent: form.discountPercent,
          discountStart: form.discountStart,
          discountEnd: form.discountEnd,
        }
      : {
          name: form.name,
          category: form.category,
          price: form.price,
          description: form.description,
        };

    const res = await fetch(`http://localhost:5000/admin/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert(isDiscountTab ? "Discount updated" : "Product updated");
      navigate("/admin/remove-product");
    }
  };

  return (
    <div className="edit-container">
      <h2>{isDiscountTab ? "Manage Discount" : "Edit Product"}</h2>

      <form className="edit-form" onSubmit={handleSubmit}>

        {!isDiscountTab && (
          <>
            <label>Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} />

            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} />

            <label>Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} />

            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </>
        )}

        {isDiscountTab && (
          <>
            <label>Discount Percentage</label>
            <input
              type="number"
              name="discountPercent"
              value={form.discountPercent}
              onChange={handleChange}
            />

            <label>Discount Start</label>
            <input
              type="datetime-local"
              name="discountStart"
              value={form.discountStart}
              onChange={handleChange}
            />

            <label>Discount End</label>
            <input
              type="datetime-local"
              name="discountEnd"
              value={form.discountEnd}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default EditProductPage;
