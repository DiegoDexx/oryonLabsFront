import React from "react";
// import logo from '../assets/img/logo_blue2.png';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer col-lg-11" id="footer">
      <div className="container">
        <div className="row flex-row">
          <div className="col-sm-12 col-md-6">
            <h6>Sobre nosotros</h6>
            <p className="text-justify">
             Oryon Labs es una pequeña empresa innovadora dedicada a la creación de soluciones tecnológicas avanzadas. Nos especializamos en el desarrollo de software personalizado, aplicaciones móviles y servicios de consultoría tecnológica para ayudar a las empresas a alcanzar sus objetivos digitales. Nuestro equipo de expertos trabaja con pasión y compromiso para ofrecer productos de alta calidad que impulsan la transformación digital 
             y el crecimiento sostenible de nuestros clientes.
            </p>
          </div>

          <div className="col-xs-6 col-md-2">
            <h6>Categorías</h6>
            <ul className="footer-links">
              <li><a href="#">C</a></li>
              <li><a href="#">UI Design</a></li>
              <li><a href="#">PHP</a></li>
              <li><a href="#">Java</a></li>
              <li><a href="#">Android</a></li>
              <li><a href="#">Templates</a></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-2">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>

      <div className="container">
        <div className="row flex-row">
          <div className="col-md-4 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2025 All Rights Reserved by <a href="#">Oryon Labs LTD</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12 flex-row social-row">
            <ul className="social-icons flex-row">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
              <li><a href="https://www.instagram.com/oryonlabs?igsh=MWs0bzZ3M3I0OW1mZw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
              <li><a href="https://www.linkedin.com/in/diego-alejandro-julcamoro-sierralta-3bb4a8224/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
              <li><a href="https://github.com/DiegoDexx" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
