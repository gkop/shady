class Spot
  include Mongoid::Document
  include Mongoid::Timestamps

  field :location, :type => Array, :geo => true

 # geo_index :location

end
