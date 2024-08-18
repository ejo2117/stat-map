export const ONE_SECOND = 1000;

export const ALTERNATE_COUNTRY_NAMES = {
	'Congo': 'Republic of the Congo',
	'French Guiana': '', // TODO: not a simple translation error here.
	'French Southern Territories': 'French Southern and Antarctic Lands',
	'Georgia': 'Georgia_(country)',
	'Ireland': 'Republic of Ireland',
	'Monaco': '', // TODO: breaks on missing "HDI" field
	'New Caledonia': '', // TODO: breaks on missing "HDI" field
	'North Korea': '', // TODO: breaks on missing "HDI" field
	'Timor': 'East Timor',
	'West Bank': '', // TODO: breaks on missing "HDI", "GDP" fields
	'Western Sahara': '', // TODO: breaks on missing "HDI", "GDP" fields
}

export const COUNTRIES_WITH_ALTERNATE_NAME = Object.keys(ALTERNATE_COUNTRY_NAMES)
