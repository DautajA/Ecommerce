import React,{useState, useEffect} from 'react';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories= useCategory();
    
  return (
    <Layout title='All Categories'>
      <div className='container-fluid'>
        <div className='row m-5'>
          {categories.map((c) =>(
            <div key={c._id} className='col-md-6  d-flex align-items-center justify-content-center mt-3 mb-3'>
                <Link to={`/category/${c.slug}`} className='btn btn-dark w-100 py-3 text-center' style={{ maxWidth: '300px',height:'70px' }}>{c.name}
                </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories;
