import json
from pprint import pprint


def create_list_of_countries():
	country_name_list = []

	# the relative path might fail depending on the process running this code
	# leaving for now since we shouldn't need to run it more than once
	with open('./public/features.json') as fd:
		json_data = json.load(fd)
		countries = json_data['objects']['world']['geometries']
		for country in countries:
			name = country['properties']['name']
			country_name_list.append(name)
	
	return country_name_list