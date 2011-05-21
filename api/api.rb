require 'rubygems'
require 'sinatra'
require 'sinatra/mongoid'
require 'geokit'
require 'models/user'

# mark spot
# POST /spots/mark?user=x&location={y}
# returns header
# TODO: see how google encodes location object

post '/spots/mark' do
  user_id = params[:user]
  user = User.find_or_create_by(:id => user_id)
  # TODO write spot model
end

# query nearby spots
# GET /spots?time=x&location={y}
# returns JSON array of location objects and scores

# load saved spots
# GET /users/:id/spots
# returns JSON array of location objects

