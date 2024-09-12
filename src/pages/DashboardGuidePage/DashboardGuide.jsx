import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardGuide() {
  const [toursCount, setToursCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const tours = JSON.parse(localStorage.getItem("tours")) || [];

    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      const guideTours = tours.filter(
        (tour) => tour.guideEmail === session.email
      );
      setToursCount(guideTours.length);
    }
  }, []);

  return (
    <>
      <div>
        <h2>Dashboard do Guia Turístico</h2>
        <p>Quantidade de Passeios Cadastrados: {toursCount}</p>

        <div>
          <button onClick={() => navigate("/create-tour")}>
            Cadastrar novo passeio
          </button>
          <button onClick={() => navigate("/list-tour")}>
            Listar passeios
          </button>
        </div>
      </div>
    </>
  );
}
