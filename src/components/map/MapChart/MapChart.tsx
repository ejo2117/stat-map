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
		window.alert(`clicked ${countryName}`)
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
