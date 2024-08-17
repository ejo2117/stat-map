from flask import Flask, jsonify, request
from markupsafe import escape

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



@app.route("/api/info")
def countryInfo():
	country_name = request.args.get('country_name')
	if not country_name:
		raise InvalidAPIUsage("No country name provided!")
	
	print(f"Received: {escape(country_name)}")

	return f"{escape(country_name)}"
        
