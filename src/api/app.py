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


def create_finder(soup_instance):
	def find_data_for_header(keyword):
		def find_header_with_keyword(tag):
			# here we have access to both the keyword and the soup instance
			return tag.name == 'th' and tag.string == keyword
		
		header = soup_instance.find(find_header_with_keyword)
		tag_with_data = header.parent.next_sibling.find('td', class_='infobox-data')
		string_content_as_list = list(tag_with_data.stripped_strings)
		
		return string_content_as_list[0]
	
	return find_data_for_header

@app.route("/api/info")
def countryInfo():
	country_name = escape(request.args.get('country_name'))
	if not country_name:
		raise InvalidAPIUsage("No country name provided!")
	
	info = {}

	page = requests.get(f"https://en.wikipedia.org/wiki/{country_name}").text
	soup = BeautifulSoup(page, 'html.parser')

	find_data_for_header = create_finder(soup)

	info['population'] = find_data_for_header('Population')

	return info
        
