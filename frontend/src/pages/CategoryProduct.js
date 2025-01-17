import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cart.js';
import toast from 'react-hot-toast';
import '../style/CartStyles.css';

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug])
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className='container-fluid mt-3 pt-3 cart-page'>
        <h1 className='text-center'>Category - {category?.name}</h1>
        <h6 className='text-center'>{products?.length} result found</h6>
        <div className='row m-5'>
          <div className='d-flex flex-wrap'>
            {products.map((p) => {
              return (
                <div key={p._id} className='col-6 col-md-4'>
                  <div className="card m-1">
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top product-img" alt={p.name} />
                    <div className="card-body">
                      <div className="card-header">
                        <h5 className="card-title">{p.name}</h5>
                        <span className="price-badge">${p.price}</span>
                      </div>
                      <p className="card-text">{p.description.substring(0, 30)}...</p>
                      <div className='cart-remove-btn'>
                        <button className='btn btn-dark ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className='btn btn-secondary ms-1'
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                            toast.success('Item added to cart')
                          }}>Add to CART</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* <div className='m-2 p-3'>
            {products && products.length < total && ( 
              <button className='btn btn-warning' onClick={(e)=> {
                e.preventDefault();
                setPage(page+1)
              }}>
                {loading ? 'Loading ...': 'Loadmore'}
            </button>)}
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
