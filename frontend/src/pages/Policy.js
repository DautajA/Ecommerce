import React from 'react'
import Layout from '../components/Layout/Layout';
import privacy from '../assets/privacypolicy.jpeg';

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className='container-fluid'>
       <div className="row privacy mt-5">
        <div className="col-md-6 text-center mb-5">
          <img src={privacy} alt="privacypolicy" className='img-fluid' />
        </div>
        <div className="col-md-6">
            <h2 className='bg-dark mb-4 p-2 text-white text-center'>PRIVACY POLICY</h2>
            <p>
              Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.
            </p>
            <h4 className="mt-4">1. Information We Collect</h4>
            <p>
              We may collect personal information such as your name, email address, phone number, and any other details you provide when using our services.
            </p>
            <h4 className="mt-4">2. How We Use Your Information</h4>
            <p>
              The information we collect is used to improve our services, respond to inquiries, and ensure a better user experience.
            </p>
            <h4 className="mt-4">3. Sharing Your Information</h4>
            <p>
              We do not share your personal information with third parties except as necessary to provide our services or comply with legal obligations.
            </p>
            <h4 className="mt-4">4. Data Security</h4>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
            </p>
          </div>
      </div>
      </div>
    </Layout>
  )
}


export default Policy


