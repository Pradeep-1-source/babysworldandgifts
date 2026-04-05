export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Visit Our Store</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <i className='bx bxs-map'></i>
              <div>
                <h3>Address</h3>
                <p>
                  Ponmanam Plaza, Upstairs Reliance Trends,<br />
                  Near New Bus Stand Road,<br />
                  Perambalur, Tamil Nadu - 621212
                </p>
              </div>
            </div>
            <div className="info-item">
              <i className='bx bxs-phone'></i>
              <div>
                <h3>Contact Number</h3>
                <p>+91 9994400124</p>
              </div>
            </div>
            <div className="info-item">
              <i className='bx bxl-whatsapp'></i>
              <div>
                <h3>WhatsApp Enquiry</h3>
                <p>+91 9994400124</p>
              </div>
            </div>

            <div className="contact-actions">
              <a href="tel:+919994400124" className="btn btn-outline">
                <i className='bx bxs-phone-call'></i> Call Us
              </a>
              <a href="https://wa.me/919994400124" target="_blank" className="btn btn-primary" rel="noreferrer">
                <i className='bx bxl-whatsapp'></i> Message
              </a>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Baby%27s+World+and+Gifts+Perambalur+Ponmanam+Plaza&hl=en&z=18&output=embed"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
