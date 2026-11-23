import { useEffect, useState } from "react";
import Contador from "./Contador";
import Gift from "./Gift/Gift";

export default function Grid({ }) {
	const [premios, setPremios] = useState([]);

	useEffect(() => {
		const cargarPremios = async () => {
			try {
				const respuesta = await fetch("/api/premios");

				if (!respuesta.ok) {
					throw new Error("No se pudieron cargar los premios");
				}

				const datos = await respuesta.json();
				setPremios(datos);

			} catch (error) {
				console.error(error);
			}
		};

		cargarPremios();
	}, []);

	return (
		<div className="grid">
			{/* {premios.map((premio, i) => (
				// <Contador
				// 	key={premio.id}
				// 	id={premio.id}
				// 	premio={premio.premio}
				// 	fechaObjetivo={premio.fecha}
				// 	desbloqueado={premio.premioDesbloqueado}
				// />
				<Gift key={i} />
			))} */}
			<Gift />
			<Gift />
			<Gift />
			<Gift />
			<Gift />
			<Gift color="yellow" />
			<Gift color="yellow" />
			<Gift color="yellow" />
			<Gift color="yellow" />
			<Gift color="yellow" />
			<Gift color="blue" />
			<Gift color="blue" />
			<Gift color="blue" />
			<Gift color="blue" />
			<Gift color="blue" />
			<Gift color="red" />
			<Gift color="red" />
			<Gift color="red" />
			<Gift color="red" />
			<Gift color="red" />
			<Gift color="orange" />
			<Gift color="orange" />
			<Gift color="orange" />
			<Gift color="orange" />
			<Gift color="orange" />
		</div>
	);
}