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
              <i className='bx bxl-whatsapp'></i>
              <div>
                <h3>Contact Number</h3>
                <p>+91 9962456600</p>
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
              <a href="tel:+919962456600" className="btn btn-outline">
                <i className='bx bxs-phone-call'></i> Call Us
              </a>
              <a href="https://wa.me/919994400124" target="_blank" className="btn btn-primary" rel="noreferrer">
                <i className='bx bxl-whatsapp'></i> Message
              </a>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.326887556094!2d78.85764091533036!3d11.237255191993278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab071f111816e1%3A0xa1ea14a51eb8aecd!2sNew%20Bus%20Stand%20Perambalur!5e0!3m2!1sen!2sin!4v1682498523307!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
