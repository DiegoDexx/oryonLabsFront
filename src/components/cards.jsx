import { FaPuzzlePiece, FaCoffee, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const WhyChooseUsCards = () => {
  const navigate = useNavigate();

  return (
    <section className="why-choose-us">
      <div className="item">
        <button className="main_btn">
          <FaPuzzlePiece />
        </button>
        <h5>Soluciones eficientes</h5>
        <p>
          Porque ofrecemos soluciones innovadoras y personalizadas para cada
          cliente.
        </p>
      </div>

      <div className="item">
        <button className="main_btn second">
          <FaCoffee />
        </button>
        <h5>Desarrollo eficiente</h5>
        <p>
          
          Porque utilizamos metodologías ágiles para entregar proyectos a tiempo
          y dentro del presupuesto.
        </p>
      </div>

      <div className="text_content">
        <h2>¿Por qué elegirnos?</h2>
            <hr className="line" />
        <p>
          Porque somos un equipo apasionado y comprometido con la excelencia en
          cada proyecto que emprendemos.
        </p>
        <button className="outline_btn" onClick={() => navigate('/faq')}>Saber más</button>

      </div>
    </section>
  );
};

export default WhyChooseUsCards;
