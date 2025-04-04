class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url, :created_at, :comments_count, :likes_count
  
  belongs_to :user, serializer: UserSerializer

  
  def image_url
    object.image.url.presence || '/placeholder.png'
  end

  def comments_count
    object.comments.count
  end

  def likes_count
    object.likes.count
  end
end