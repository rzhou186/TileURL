from google.appengine.ext import ndb
import jinja2
import webapp2
import os

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render({ 'state': '"new"' }))

class ShowHandler(webapp2.RequestHandler):
    def get(self, id):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render({ 'state': '"' + id + '"' })) # NOT SECURE

application = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/(.+)', ShowHandler)
])
