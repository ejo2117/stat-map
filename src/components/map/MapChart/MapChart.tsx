import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import styles from './MapChart.module.scss';

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


const getCountryInfo = async (countryName: string) => {
	if (!countryName) {
		return null	
	}
	const encodedCountryName = countryName.replace(' ', '_')	
	const res = await fetch(`/api/info?country_name=${encodedCountryName}`)
	const data = await res.json()
	return data
}

const MapChart = () => {

	const [countryName, setCountryName] = useState(null)

	const { data } = useQuery({
		queryKey: ['data', countryName],
		queryFn: async () => getCountryInfo(countryName),
		
	})

	return (
		<>
			<pre className={styles.infoBox}>{JSON.stringify(data, null, 2)}</pre>
			<ComposableMap>
				<ZoomableGroup>
					<Geographies geography='./features.json'>
						{({ geographies }) => 
							(geographies as Geo[]).map((geo, i) => {
								return (
									<Geography 
										key={geo.rsmKey} 
										geography={geo} 
										onClick={() => setCountryName(geo.properties.name)} 
										style={{
											hover: {
												'fill': 'blue',
											},
										}}
									/>
								);
							})
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</>
	)
};

export default MapChart;
