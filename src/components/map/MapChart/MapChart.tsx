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

	return (
		<ComposableMap>
			<Geographies geography='./features.json'>
				{({ geographies }) => 
					geographies.map((geo) => (
						<Geography key={geo.rsmKey} geography={geo} />
					))
				}
			</Geographies>
		</ComposableMap>
	)
};

export default MapChart;
