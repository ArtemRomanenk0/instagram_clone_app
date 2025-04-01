class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :is_following

  def is_following
    current_user = instance_options[:current_user]
    current_user.present? && current_user.following?(object)
  end

  def avatar_url
    object.avatar.url || '/default_avatar.png'
  end
end