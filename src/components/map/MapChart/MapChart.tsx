import { ComposableMap, Geographies, Geography } from 'react-simple-maps';


type Geo = {
	geometry: {
		type: string;
		coordinates: Array<Array<Array<number>>>
	};
	id: string;
	properties: {
		name: string;
	};
	rsmKey: string;
	svgPath: string;
	type: string;
}

const MapChart = () => {

	const handleClick = (countryName: string) => {
		const data = fetch(`/api/info?country_name=${countryName}`)
			.then(response => {
				const text = response.text()
					.then(textResponse => textResponse)
					.catch(textErr => {
						console.error(`Error parsing text: ${textErr}`)
					})
				return text
			})
			.catch(err => {
				console.error(`Error fetching from API: ${err}`);
			})
		// eslint-disable-next-line no-console
		console.log({ data })
	}

	return (
		<ComposableMap>
			<Geographies geography='./features.json'>
				{({ geographies }) => 
					(geographies as Geo[]).map((geo, i) => {

						if (i === 0) {
							// console.log({ geo })
						}

						return (
							<Geography key={geo.rsmKey} geography={geo} onClick={() => handleClick(geo.properties.name)} />
						);
					})
				}
			</Geographies>
		</ComposableMap>
	)
};

export default MapChart;
