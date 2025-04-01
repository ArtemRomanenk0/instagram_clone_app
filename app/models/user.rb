class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :avatar, AvatarUploader

  validates :username, presence: true, uniqueness: true
  before_create :generate_authentication_token

  has_many :posts, dependent: :destroy
  has_many :subscriptions, foreign_key: :follower_id, dependent: :destroy
  has_many :followed_users, through: :subscriptions, source: :following
  has_many :followers, through: :subscriptions, source: :follower

  def feed_posts
    Post.where(user_id: followed_user_ids + [id]).order(created_at: :desc)
  end

  def follow(user)
    subscriptions.create(following: user) unless following?(user) || self == user
  end

  def unfollow(user)
    subscriptions.find_by(following: user)&.destroy
  end

  def following?(user)
    followed_users.include?(user)
  end

  def regenerate_authentication_token!
    update(authentication_token: Devise.friendly_token)
  end

  private

  def generate_authentication_token
    self.authentication_token = Devise.friendly_token
  end
end