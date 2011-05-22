require 'rubygems'
require 'ruby-debug'
require 'sinatra'
require 'sinatra/mongoid'
require 'geokit'
require 'mongoid_geo'
require 'models/user'
require 'models/spot'

# mark spot
# POST /spots/mark?user=x&location={y}
# returns 200 OK
# TODO: see how google encodes location object

post '/spots/mark' do
  # TODO somehow authenticate user
  user_id = params[:client_id]
  latitude = params[:lat]
  longitude = params[:lng]
  user = User.find_or_create_by(:string_id => user_id)
  spot = Spot.create!(:location => {:latitude => latitude, :longitude => longitude}) 
  user.spots << spot
  user.save!
end

# query nearby spots
# GET /spots?time=x&location={y}
# returns JSON array of location objects and scores

# load saved spots
# GET /users/:id/spots
# returns JSON array of location objects

get '/users/:id/spots' do
  user = User.find(params[:id])
  user.spots.to_json(:except => [ :created_at, :updated_at, '_id', :user_id ])
end
