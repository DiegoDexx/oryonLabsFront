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
          <button className="btn btn-main">Comenzar</button>
          <button className="btn btn-outline">Aprender más</button>
        </div>
        <div className="banner__social">
          <button className="btn btn-outline">
            <FaTwitter />
          </button>
          <button className="btn btn-outline">
            <FaLinkedin />
          </button>
          <button className="btn btn-main">
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
