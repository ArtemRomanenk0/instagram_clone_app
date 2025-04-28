class UserProfileSerializer < UserSerializer
  attributes :posts_count, :followers_count

  has_many :posts, serializer: PostSerializer

  def posts_count
    object.posts.size
  end

  def followers_count
    object.followers.size
  end
end