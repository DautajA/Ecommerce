import React from 'react'
import Footer from './Footer';
import Header from './Header';
import {Helmet} from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

const Layout = ({  children,
  title = 'Wonder House - shop now',
  description = "mern stack project",
  keywords = "mern,react,node,mongodb",
  author = "Armonela"}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8'/>
        <meta className='description' content={description}/>
        <meta className='keywords' content={keywords}/>
        <meta className='author' content={author}/>
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight:'70vh'}}>
      <Toaster />
        {children}
      </main>
      <Footer/>
    </div>
  )
};

export default Layout;
