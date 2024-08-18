import requests
from flask import Flask, jsonify, request
from markupsafe import escape
from bs4 import BeautifulSoup

app = Flask(__name__)

class InvalidAPIUsage(Exception):
	status_code = 400
     
	def __init__(self, message, status_code=None, payload=None):
		super().__init__()
		self.message = message
		if status_code is not None:
			self.status_code = status_code
		self.payload = payload

	def to_dict(self):
		rv = dict(self.payload or ())
		rv['message'] = self.message
		return rv
		

@app.errorhandler(InvalidAPIUsage)
def invalid_api_usage(e):
	return jsonify(e.to_dict()), e.status_code

@app.route("/")
def index():
    return "Index"


# TODO: probably easier to read as a Class
def create_finder(soup_instance):
	def scrape_merged_table(keyword):
		def find_top_row(tag):
			return tag.name == 'th' and tag.contents[0].string == keyword

		info = {}
		top_row = soup_instance.find(find_top_row).parent

		if(top_row.has_attr('class') and 'mergedtoprow' in top_row['class']):
			row = top_row.next_sibling

			good_classes = ['mergedrow', 'mergedbottomrow']
			row_classes = row['class']

			while(not set(good_classes).isdisjoint(set(row_classes))):
				label = ' '.join(list(row.th.stripped_strings))
				data = list(row.td.stripped_strings)[0]
				info[label] = data
				row = row.next_sibling
				row_classes = row['class']
		else:
			info = list(top_row.td.stripped_strings)[0]

		return info


	return scrape_merged_table


@app.route("/api/info")
def countryInfo():
	country_name = escape(request.args.get('country_name'))
	if not country_name:
		raise InvalidAPIUsage("No country name provided!")
	
	info = {
		'name': country_name
	}

	page = requests.get(f"https://en.wikipedia.org/wiki/{country_name}").text
	soup = BeautifulSoup(page, 'html.parser')

	find_data_for_header = create_finder(soup)

	info['population'] = find_data_for_header('Population')
	info['gdp'] = find_data_for_header('GDP')
	info['hdi'] = find_data_for_header('HDI')

	return info
        
