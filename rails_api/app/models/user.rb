class User
  include Mongoid::Document
  include Mongoid::Timestamps

  # make id a string rather than an objectID
  field :string_id, :type => String

  # identify models by string id
  key :string_id

  references_many :spots
end
