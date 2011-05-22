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
# returns header
# TODO: see how google encodes location object

post '/spots/mark' do
  user_id = params[:user]
  latitude = params[:latitude]
  longitude = params[:longitude]
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

