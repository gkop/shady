require 'rubygems'
require 'sinatra'
require 'sinatra/mongoid'
require 'geokit'

# mark spot
# POST /spots/mark?user=x&location={y}
# returns header
# TODO: see how google encodes location object

# query nearby spots
# GET /spots?time=x&location={y}
# returns JSON array of location objects and scores

# load saved spots
# GET /users/:id/spots
# returns JSON array of location objects
