import React, { useState, useEffect } from "react"; 
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);

  // Total price calculation
  const totalPrice = () => {
    try {
      const total = cart?.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/braintree/token');
      console.log("Client Token: ", data?.clientToken); // Log client token
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Error fetching client token", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);


  // Handle payment when button is clicked
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Nonce:", nonce); 

      const { data } = await axios.post(
        'http://localhost:8080/api/v1/product/braintree/payment',
        { nonce, cart }
      );

      console.log("Payment Response:", data); 
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment Completed Successfully');
    } catch (error) {
      setLoading(false);
      console.error("Payment failed", error);
      toast.error('Payment failed');
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="admin-part text-center mt-5 bg-light p-2">{`Hello ${auth?.token && auth?.user?.name}`}</h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row mb-3 p-3 card flex-row cart-page1" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    width="100px"
                    height="170px"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price :$ {p.price}</p>
                  <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h5>Current Address</h5>
                <h6>{auth?.user?.address}</h6>
                <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
                    Update Address
                  </button>
                ) : (
                  <button className="btn btn-outline-warning" onClick={() => navigate('/login', { state: '/cart' })}>
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {
                !clientToken || !cart?.length ? ('') : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: 'vault' },
                      }}
                      onInstance={(instance) => { setInstance(instance); console.log("DropIn instance set:", instance); }}
                    />
                    <button className="btn btn-primary" 
                      onClick={handlePayment} 
                      disabled={!instance || loading || !auth?.user?.address}>
                      {loading ? 'Processing...' : 'Make Payment'}
                    </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;


