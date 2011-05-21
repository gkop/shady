class User
  include Mongoid::Document
  include Mongoid::Timestamps

  # make id a string rather than an objectID
  field :id, :type => String

  # identify models by string id
  key :id

end
