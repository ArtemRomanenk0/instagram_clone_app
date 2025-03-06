class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url, :created_at
   belongs_to :user, serializer: UserSerializer

  def image_url
    object.image.url
  end
end
