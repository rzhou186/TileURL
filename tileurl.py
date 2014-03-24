from google.appengine.ext import ndb

import jinja2
import webapp2
import json

import os

class Shorten(ndb.Model):
    """Models one shortened URL. Shape of data (this is also what's sent to /new):
    {
        "sid": "foobar",
        "urls": [
            {
                "col": 1,
                "row": 1,
                "size_x": 2,
                "size_y": 2,
                "url": "http://www.google.com"
            }
        ]
    }"""
    data = ndb.JsonProperty()

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        """GET to / renders index.html with state variable
        state = {
            "type": "new"
        }"""
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render({ 'state': { 'type': 'new' } }))

class NewHandler(webapp2.RequestHandler):
    def post(self):
        """POST to /new tries to create a shorten based on data param and responds
        { "status": "malformed" | "exists" | "success" }"""
        data = json.loads(self.request.get('data'))

        if not 'sid' in data:
            self.response.write('{ "status": "malformed" }')
        elif Shorten.get_by_id(data['sid']):
            self.response.write('{ "status": "exists" }')
        else:
            shorten = Shorten(data=data, id=data['sid'])
            shorten.put()

            self.response.write('{ "status": "success" }')

class ShowHandler(webapp2.RequestHandler):
    def get(self, sid):
        """GET to /foobar renders index.html with state variable
        state = {
            "type": "new" | "show",
            "sid": "foobar",
            "urls": [...]
        }"""
        shorten = Shorten.get_by_id(sid)

        template = JINJA_ENVIRONMENT.get_template('index.html')
        if shorten:
            state = shorten.data
            state['type'] = 'show'
        else:
            state = { 'type': 'new', 'sid': sid }

        self.response.write(template.render({ 'state': state }))

application = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/new', NewHandler),
    ('/(.+)', ShowHandler)
])
