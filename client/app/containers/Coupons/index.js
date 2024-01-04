import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

function Index() {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [selectedId, setSelectedId] = useState('');

  const url = 'http://localhost:3000/api'; // Adjust the backend API URL accordingly

  // Fetch the list of coupons on mount
  useEffect(() => {
    axios.get(`${url}/coupons`)
      .then((res) => setCoupons(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Apply the coupon to the total price on submit
  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`${url}/coupons/apply`, { code: couponCode, totalPrice })
      .then((res) => setDiscountedPrice(res.data.discountedPrice))
      .catch((err) => console.error(err));
  }

  // Create a new coupon on submit
  function handleCreate(event) {
    event.preventDefault();
    const data = {
      code: event.target.code.value,
      discount: event.target.discount.value,
    };
    axios.post(`${url}/coupons`, data)
      .then((res) => setCoupons([...coupons, res.data]))
      .catch((err) => console.error(err));
  }

  // Update a coupon on submit
  function handleUpdate(event) {
    event.preventDefault();
    const id = selectedId; // Use the selected ID from the dropdown
    const data = {
      code: event.target.code.value,
      discount: event.target.discount.value,
    };
    axios.put(`${url}/coupons/${id}`, data)
      .then((res) => {
        const updatedCoupon = res.data;
        setCoupons(coupons.map((coupon) => coupon._id === updatedCoupon._id ? updatedCoupon : coupon));
      })
      .catch((err) => console.error(err));
  }

  // Delete a coupon on click
  function handleDelete(id) {
    axios.delete(`${url}/coupons/${id}`)
      .then(() => setCoupons(coupons.filter((coupon) => coupon._id !== id)))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <Col >
        <h1>Coupon Management System</h1>
        <h2>List of Coupons</h2>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Coupon Code</th>
                <th scope="col">Percent</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr scope="row" key={coupon._id}>
                  <td>{coupon._id}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>
                    <Button
                      type='submit'
                      text='Delete'
                      onClick={() => handleDelete(coupon._id)}
                      className="btn btn-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Col>
      <Col >
        <h2>Create Coupon</h2>
        <form onSubmit={handleCreate}>
          <label className="my-2" htmlFor="code">Code:</label>
          <input className="my-2" type="text" id="code" />
          <br />
          <label className="my-2" htmlFor="discount">Discount (%):</label>
          <input className="my-2" type="number" id="discount" />

          <div className='d-flex justify-content-center'>
            <Button type='submit' className="my-2" text='Create Coupon' />
          </div>
        </form>
      </Col>
      <Col >
        <h2 className="my-2">Update Coupon</h2>
        <form onSubmit={handleUpdate}>
          <label className="my-2" htmlFor="id">Select ID:</label>

          <select
            className="btn border w-100 border-primary-grey border-2  dropdown-toggle my-2"
            id="id"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">-- Select an ID --</option>
            {coupons.map((coupon) => (
              <option key={coupon._id} value={coupon._id}>
                {coupon._id}
              </option>
            ))}
          </select>
          <br />
          <label className="my-2" htmlFor="code">Code:</label>
          <input className="my-2" type="text" id="code" />
          <br />

          <label className="my-2" htmlFor="discount">Discount (%):</label>
          <input className="my-2" type="number" id="discount" />
          <div className="d-flex justify-content-center">
          <Button className="my-2" type="submit" text="Update Coupon" />
          </div>
        </form>
      </Col>
    </div>
  );
}

export default Index;
