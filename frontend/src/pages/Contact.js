import React from 'react'
import Layout from '../components/Layout/Layout';
import contact from '../assets/contactus.jpeg'
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout title={'Contact us'}>
      <div className='container-fluid'>
      <div className='row contactus mt-5'>
        <div className='col-md-6'>
          <img src={contact} alt='contactus' style={{width:'100%'}}/>
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>any query and info about product feel free to call anytime me 24x7</p>
          <p className='mt-3'>
            <BiMailSend/> : www.help@wonderhouse.com
          </p>
          <p className='mt-3'>
            <BiPhoneCall/> : 012-3456789
          </p>
          <p className='mt-3'>
            <BiSupport/> : 1800-0000-0000 (call free)
          </p>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Contact
