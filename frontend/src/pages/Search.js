import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.js';
import toast from 'react-hot-toast';

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
  return (
    <Layout title='Search results'>
      <div className='container-fluid'>
        <div className='text-center cart-page'>
          <h1>Search Results</h1>
          <h6>{values.results.length < 1 ? `No Products Found` : `Found ${values?.results.length}`}</h6>
          <div className='d-flex flex-wrap'>
            {values.results.map((p) => {
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
                        <button className='btn btn-dark ms-1'
                          onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
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
        </div>
      </div>
    </Layout>
  )
}

export default Search
