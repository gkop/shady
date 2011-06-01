class SpotsController < ApplicationController
  respond_to :json
  
  def index
    user = User.find(params[:user_id])
    @spots = user.spots.desc(:created_at).limit(10)
    respond_with(@spots)
  end

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