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
		const encodedCountryName = countryName.replace(' ', '_')
		const data = fetch(`/api/info?country_name=${encodedCountryName}`)
			.then(response => {
				const json = response.json()
					.then(jsonResponse => jsonResponse)
					.catch(jsonErr => {
						console.error(`Error parsing json: ${jsonErr}`)
					})
				return json
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
