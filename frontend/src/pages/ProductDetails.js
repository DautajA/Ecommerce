import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import '../style/CartStyles.css';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();


  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error)
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className='container-fluid'>
        <div className='row conatiner-fluid mt-3'>
          <div className='col-md-6'>
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              className="card-img-top "
              alt={product?.name}
              height={"400px"}
              width={"350px"}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className='col-md-6 product-details-container'>
            <h1 className='text-center product-details'>Product Details</h1>
            <h5>Name : <span>{product?.name}</span></h5>
            <h5>Description : <span>{product?.description}</span></h5>
            <h5>Price : <span>{product?.price}</span></h5>
            <h5>Category : <span>{product?.category?.name}</span></h5>
            <button className='btn btn-secondary ms-1'
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                toast.success('Item added to cart')
              }}>Add to CART</button>
          </div>
        </div>
        <hr />
        <div className='row container-fluid cart-page'>
          <div>
            <h1 className=' text-center'>Similar products</h1>
            {relatedProducts.length < 1 && (<p className='text-center'>No similar Products found</p>)}
            <div className='d-flex flex-wrap'>
              {relatedProducts?.map((p) => {
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
                        {/* <button className='btn btn-primary ms-1' onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button> */}
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
      </div>
    </Layout>
  )
}

export default ProductDetails
