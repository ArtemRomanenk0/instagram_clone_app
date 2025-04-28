class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url, :created_at, :comments_count, :likes_count, :is_liked, :like_id
  has_many :comments, serializer: CommentSerializer
  belongs_to :user, serializer: UserSerializer
  
  

 def image_url
  if object.image.present?
  
    "/uploads/post/image/#{object.id}/#{object.image_identifier}"
  else
    "/images/placeholder.png"
  end
end

def avatar_url
 
  object.user.avatar_url.presence || "/images/default_avatar.png"
end
  def comments_count
    object.comments.count
  end

  def likes_count
    object.likes.size
  end

  def is_liked
    current_user = scope
    object.likes.exists?(user: current_user)
  end
  

  def like_id
    current_user = scope
    object.likes.find_by(user: current_user)&.id
  end

  def likes_count
    object.likes_count || object.likes.count
  end

end