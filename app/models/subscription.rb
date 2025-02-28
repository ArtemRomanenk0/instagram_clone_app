
class Subscription < ApplicationRecord
belongs_to :follower, class_name: 'User'
belongs_to :following, class_name: 'User'
validates :follower_id, uniqueness: { scope: :following_id }
validate :cannot_follow_self

def cannot_follow_self
  errors.add(:base, "You can't follow yourself") if follower_id == following_id
end
end


