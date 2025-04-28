class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :is_following, :followers_count

  def followers_count
    object.followers.count 
  end

  def is_following
    current_user = scope
    current_user.present? && current_user.following?(object)
  end

  def avatar_url

    object.avatar_url.presence || "/images/default_avatar.png"
  end
end