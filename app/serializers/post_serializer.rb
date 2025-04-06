class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url, :created_at, :comments_count, :likes_count
  
  belongs_to :user, serializer: UserSerializer

  
 # post_serializer.rb
 def image_url
  if object.image.present?
    # Используйте идентификатор файла вместо filename
    "/uploads/post/image/#{object.id}/#{object.image_identifier}"
  else
    "/images/placeholder.png"
  end
end

def avatar_url
  # Убедитесь, что путь ведет к существующему файлу
  object.user.avatar_url.presence || "/images/default_avatar.png"
end
  def comments_count
    object.comments.count
  end

  def likes_count
    object.likes.count
  end
end