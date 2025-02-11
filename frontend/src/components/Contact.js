import React, { useState } from 'react';
import './contact.css';
import axios from 'axios';

const About = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message };

    try {
      const response = await axios.post('http://localhost:9000/api/contact/submit_form', formData);
      setStatus(response.data.message);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('Error submitting the form. Please try again.');
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div>
      <header>
        <h1>Contact Us</h1>
        <p>
          Get in touch with us for any inquiries, feedback, or support. Our team, <strong>Create & Co</strong>, is here to help!
        </p>
      </header>

      <div className="about">
        <section>
          <h2>Our Contact Details</h2>
          <p>Reach out to us for any specific queries!</p>

          <div className="contact-info">
            <p><strong>Name:</strong> T. Mokshith Sai</p>
            <p><strong>Email:</strong> <a href="mailto:thutukurimokshithsai@gmail.com">thutukurimokshithsai@gmail.com</a></p>
            <p><strong>Mobile:</strong> +91 9398710949</p>
          </div>
        </section>
        
        <section className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            /><br /><br />

            <label htmlFor="email">Your Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            /><br /><br />

            <label htmlFor="message">Your Message:</label><br />
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              cols="50" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required 
            ></textarea><br /><br />

            <button type="submit">Submit</button>
          </form>
          {status && <p>{status}</p>}
        </section>
      </div>
    </div>
  );
};

export default About;
