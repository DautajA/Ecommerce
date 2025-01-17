import React from "react";
import Layout from "../components/Layout/Layout";
import about from '../assets/about.jpg';

const About = () => {
  return (
    <Layout title={'About us'}>
      <div className="container-fluid">
        <div className="row about mt-5">
          <div className="col-md-6">
            <img src={about} alt="about" style={{ width: "100%" }} />
          </div>
          <div className="col-md-6">
            <h2 className='bg-dark mb-4 p-2 text-white text-center'>Who We Are ?</h2>
            <p className="text-justify">
              Welcome to our eCommerce platform, where we prioritize quality, innovation, and customer satisfaction. We are passionate about providing you with products that enhance your lifestyle while ensuring an effortless shopping experience.
            </p>
            <h3 className='bg-dark mb-3 p-2 text-white text-center'>Why Choose Us ?</h3>
            <p>
              In today’s fast-paced world, online shopping is more than a convenience—it’s a necessity. Here’s what sets us apart:
            </p>
            <ul>
              <li>
                <strong>Comprehensive Product Information:</strong> We provide detailed product descriptions and high-quality images to help you make informed decisions.
              </li>
              <li>
                <strong>Customer-Centric Approach:</strong> Your satisfaction is our top priority. Our support team is always here to assist you with any questions or concerns.
              </li>
              <li>
                <strong>Innovation and Quality:</strong> We continuously strive to bring you the latest and most reliable products on the market.
              </li>
            </ul>
          </div>
        </div>
        <div className="row about mt-4 ms-1">
          <h3 className='bg-dark mb-3 p-2 text-white text-center'>OUR MISSION</h3>
          <p>
            At the heart of our business lies a simple yet powerful mission:
            to transform online shopping into an experience that is not only convenient but also meaningful and rewarding.
          </p>
          <p>
            We aim to bridge the gap between the digital and physical shopping worlds by providing detailed product insights,
            personalized recommendations, and exceptional service. Our mission is driven by a commitment to:
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
