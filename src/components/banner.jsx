import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import image from "../assets/img/mujer_programando1.png";

const Banner = () => {
  return (
    <main className="banner col-lg-11">
      <div className="banner__left">
        <h1>La mejor solución para tu negocio</h1>
        <h4>
          Haz crecer tu negocio con nuestra plataforma y llévalo al siguiente nivel.
        </h4>
        <div className="banner__buttons">
          <button className="btn btn-main" onClick={() => {
            const el = document.getElementById('multistep-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Comenzar</button>
          <button className="btn btn-outline" onClick={() => {
            const el = document.getElementById('footer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Aprender más</button>
        </div>
        <div className="banner__social">
          <button className="btn btn-outline" onClick={() => {
            window.open("https://twitter.com", "_blank");
          }}>
            <FaTwitter />
          </button>
          <button className="btn btn-outline" onClick={() => {
            window.open("https://www.linkedin.com/in/diego-alejandro-julcamoro-sierralta-3bb4a8224/", "_blank");
          }}>
            <FaLinkedin />
          </button>
          <button className="btn btn-main" onClick={() => {
            window.open("https://www.instagram.com/oryonlabs?igsh=MWs0bzZ3M3I0OW1mZw%3D%3D&utm_source=qr", "_blank");
          }}>
            <FaInstagram />
          </button>
        </div>
      </div>

      <div className="banner__right">
        <div className="banner__image">
            <img src={image} alt="Business Cartoon" />

        </div>
      </div>
    </main>
  );
};

export default Banner;
