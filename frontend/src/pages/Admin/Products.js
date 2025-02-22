import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../../style/CartStyles.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/product/get-product');
            setProducts(data.products);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        } 
    };
    
    useEffect(() => {
        getAllProducts();
    }, [])
console.log(products)
    return (
        <Layout title={"Dashboard - Products"}>
            <div className="row container-fluid mt-3 pt-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='admin-part text-center'>All Products List</h1>
                    <div className='row cart-page'>
                    {products.map( (p) => {
                        return(
                        <div key={p._id} className='col-6 col-md-4'>
                            <Link  to={`/dashboard/admin/product/${p.slug}`} className='product-link'> 
                            <div className="card m-1">
                           <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top product-img" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                            </div>
                            </div>
                            </Link>
                        </div>
                        )
                    })}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Products;
