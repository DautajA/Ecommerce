import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices.js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.js';
import toast from 'react-hot-toast';
import banner from '../assets/banner.png';
import '../style/CartStyles.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  //get all product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  };

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/product-count');
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (page == 1) return; loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  };

  //get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/product/product-filter', { checked, radio });
      console.log("Filtered products:", data.products);
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layout title={'All Products - Best Offers'}>
      <img src={banner} alt='Bannner' style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <div className='container-fluid row mt-3'>
        <div className='col-md-2'>
          <h5 className='text-center'>Filter By Category</h5>
          {categories?.map((c) => {
            return (
              <div key={c._id}>
                <Checkbox onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              </div>
            )
          })}
          {/* filter by price */}
          <h5 className='text-center mt-4'>Filter By Price</h5>
          <div>
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET Filter</button>
          </div>
        </div>
        <div className='col-md-10 cart-page'>
          <h1 className='text-center'>All Products</h1>
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
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1)
              }}>
                {loading ? 'Loading ...' : 'Loadmore'}
              </button>)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
