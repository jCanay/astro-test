import { useEffect, useState } from "react";
import Contador from "./Contador";
import GiftBox from "./Gift/GiftBox";
import ModernGift, { Colors } from "./Gift/ModernGift";


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

	// return (
	// 	<div className="grid">
	// 		{/* {premios.map((premio, i) => (
	// 			// <Contador
	// 			// 	key={premio.id}
	// 			// 	id={premio.id}
	// 			// 	premio={premio.premio}
	// 			// 	fechaObjetivo={premio.fecha}
	// 			// 	desbloqueado={premio.premioDesbloqueado}
	// 			// />
	// 			<Gift key={i} />
	// 		))} */}
	// 		<Gift />
	// 		<Gift />
	// 		<Gift />
	// 		<Gift />
	// 		<Gift />
	// 		<Gift color="yellow" />
	// 		<Gift color="yellow" />
	// 		<Gift color="yellow" />
	// 		<Gift color="yellow" />
	// 		<Gift color="yellow" />
	// 		<Gift color="blue" />
	// 		<Gift color="blue" />
	// 		<Gift color="blue" />
	// 		<Gift color="blue" />
	// 		<Gift color="blue" />
	// 		<Gift color="red" />
	// 		<Gift color="red" />
	// 		<Gift color="red" />
	// 		<Gift color="red" />
	// 		<Gift color="red" />
	// 		<Gift color="orange" />
	// 		<Gift color="orange" />
	// 		<Gift color="orange" />
	// 		<Gift color="orange" />
	// 		<Gift color="orange" />
	// 	</div>
	// );

	return (
		<div className="grid">
			<ModernGift bgImageSrc="/gift/square1.svg" label={1} bgColor={Colors.yellow} />
			<ModernGift bgImageSrc="/gift/square2.svg" label={2} bgColor={Colors.blue} />
			<ModernGift bgImageSrc="/gift/square3.svg" label={3} labelPos="tr" bgColor={Colors.olive} />
			<ModernGift bgImageSrc="/gift/square4.svg" label={4} bgColor={Colors.green} />
			<ModernGift bgImageSrc="/gift/square5.svg" label={5} bgColor={Colors.red} />
			<ModernGift bgImageSrc="/gift/square6.svg" label={6} bgColor={Colors.olive} />
			<ModernGift bgImageSrc="/gift/square15.svg" label={7} labelPos="tr" bgColor={Colors.blue} />
			<ModernGift bgImageSrc="/gift/square8.svg" label={8} bgColor={Colors.red} />
			<ModernGift bgImageSrc="/gift/square7.svg" label={9} bgColor={Colors.green} />
			<ModernGift bgImageSrc="/gift/square10.svg" label={10} bgColor={Colors.blue} />
			<ModernGift bgImageSrc="/gift/square11.svg" label={11} bgColor={Colors.red} />
			<ModernGift bgImageSrc="/gift/square12.svg" label={12} bgColor={Colors.yellow} />
			<ModernGift bgImageSrc="/gift/square13.svg" label={13} labelPos="tl" bgColor={Colors.blue} />
			<ModernGift bgImageSrc="/gift/square14.svg" label={14} bgColor={Colors.olive} />
			<ModernGift bgImageSrc="/gift/square15.svg" label={15} bgColor={Colors.yellow} />
			<ModernGift bgImageSrc="/gift/square9.svg" label={16} bgColor={Colors.blue} />
			<ModernGift bgImageSrc="/gift/square17.svg" label={17} bgColor={Colors.green} />
			<ModernGift bgImageSrc="/gift/square18.svg" label={18} bgColor={Colors.blue} />
			<ModernGift bgImageSrc="/gift/square19.svg" label={19} bgColor={Colors.red} />
			<ModernGift bgImageSrc="/gift/square20.svg" label={20} bgColor={Colors.green} />
			<ModernGift bgImageSrc="/gift/square22.svg" label={21} labelPos="bl" bgColor={Colors.red} />
			<ModernGift bgImageSrc="/gift/square21.svg" label={22} bgColor={Colors.yellow} />
			<ModernGift bgImageSrc="/gift/square16.svg" label={23} labelPos="bl" bgColor={Colors.olive} />
			<ModernGift bgImageSrc="/gift/square25.svg" label={24} labelPos="tl" bgColor={Colors.blue} />
		</div>
	);
}