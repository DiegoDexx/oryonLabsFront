import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo_blue2.png';


const FAQWebConsultora = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  // Copiado al portapapeles
  const copyToClipboard = (str) => {
    navigator.clipboard.writeText(str).then(() => {
      alert('Correo copiado al portapapeles!');
    }, (err) => {
      console.error('Error al copiar al portapapeles: ', err);
    });
  };

  const handleCopyClick = () => {
    copyToClipboard('oryonlabs@gmail.com');
  };

  return (
    <div className="faq-page ">
      <nav className="product-navbar">
        <Link to="/" className="back-link">← Volver a la página principal</Link>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p>Oryon Labs</p>
        </div>
      </nav>

      <div className="contact-container col-lg-11">

        <div className='title'>
          <h2>Preguntas frecuentes sobre nuestros servicios web</h2>
        </div>

        <div className="accordion">
          <div className="accordion-item">
            <button
              aria-expanded={expandedAccordion === 1}
              onClick={() => toggleAccordion(1)}
            >
              <span className="accordion-title">¿Qué servicios ofrece la consultora?</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <p>Ofrecemos desarrollo web, diseño de sitios corporativos, tiendas online, portafolios digitales, SEO y mantenimiento de proyectos web.</p>
            </div>
          </div>

          <div className="accordion-item">
            <button
              aria-expanded={expandedAccordion === 2}
              onClick={() => toggleAccordion(2)}
            >
              <span className="accordion-title">¿Cuánto tiempo tarda un proyecto?</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <p>El tiempo depende del tipo y alcance del proyecto. Normalmente, un sitio web corporativo toma entre <strong>2 y 4 semanas</strong>, mientras que una tienda online puede requerir <strong>4 a 8 semanas</strong>.</p>
            </div>
          </div>

          <div className="accordion-item">
            <button
              aria-expanded={expandedAccordion === 3}
              onClick={() => toggleAccordion(3)}
            >
              <span className="accordion-title">¿Ofrecen mantenimiento y soporte?</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <p>Sí, proporcionamos planes de mantenimiento mensual, actualizaciones, backups y soporte técnico para asegurar que tu web funcione sin problemas.</p>
            </div>
          </div>

          <div className="accordion-item">
            <button
              aria-expanded={expandedAccordion === 4}
              onClick={() => toggleAccordion(4)}
            >
              <span className="accordion-title">¿Cómo se realiza la gestión de contenido?</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <p>Todos nuestros sitios incluyen un sistema de gestión de contenido (CMS) intuitivo, que te permite actualizar textos, imágenes y productos de manera sencilla.</p>
            </div>
          </div>

          <div className="accordion-item">
            <button
              aria-expanded={expandedAccordion === 5}
              onClick={() => toggleAccordion(5)}
            >
              <span className="accordion-title">¿Cómo puedo contactar con ustedes?</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <p>Puedes escribirnos a nuestro <span onClick={handleCopyClick} className="copy-text">correo de contacto</span> o enviarnos un mensaje a través del formulario de nuestra web. Te responderemos lo antes posible.</p>
            </div>
          </div>
        </div>
      </div>
 
     
    </div>
  );
};

export default FAQWebConsultora;
