class SpotsController < ApplicationController
  respond_to :json, :html

  # TODO solve authentication
  protect_from_forgery :only => [] 
 
  # GET /users/:user_id/spots
  # GET /spots?lat_a=x1&lng_a=y1&lat_b=x2&lng_b=y2
  # returns spots by user or location
  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      @spots = user.spots.desc(:created_at).limit(10)
    else
      latitude_a = params[:lat_a].to_f
      longitude_a = params[:lng_a].to_f
      latitude_b = params[:lat_b].to_f
      longitude_b = params[:lng_b].to_f
      box = [[latitude_a, longitude_a], [latitude_b, longitude_b]]
      @spots = Spot.where(:location.within_box => box)
    end
    respond_with(@spots)
  end

  # POST /spots/create?lat=x&lng=y&user_id=z
  # returns created spot
  def create
    user_id = params[:user_id]
    latitude = params[:lat]
    longitude = params[:lng]
    user = User.find_or_create_by(:string_id => user_id)
    spot = Spot.create!(:location => {:latitude => latitude.to_f, :longitude => longitude.to_f})
    user.spots << spot
    user.save!
    respond_with(spot)
  end

end
