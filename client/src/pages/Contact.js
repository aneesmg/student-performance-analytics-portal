import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="contact page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Have questions or suggestions? We'd love to hear from you.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="card info-card">
              <h3>Get in Touch</h3>
              <div className="info-item">
                <span className="info-icon">&#9993;</span>
                <div><strong>Email</strong><p>info@codiora.com</p></div>
              </div>
              <div className="info-item">
                <span className="info-icon">&#9742;</span>
                <div><strong>Phone</strong><p>+1 (555) 123-4567</p></div>
              </div>
              <div className="info-item">
                <span className="info-icon">&#9906;</span>
                <div><strong>Address</strong><p>123 Tech Street, Silicon Valley, CA 94025</p></div>
              </div>
              <div className="info-item">
                <span className="info-icon">&#128337;</span>
                <div><strong>Hours</strong><p>Mon-Fri: 9:00 AM - 6:00 PM</p></div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="card success-card">
                <span className="success-icon">&#10004;</span>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className="card contact-form" onSubmit={handleSubmit} noValidate>
                <h3>Send us a Message</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} className={errors.subject ? 'error' : ''} />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange} className={errors.message ? 'error' : ''}></textarea>
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
