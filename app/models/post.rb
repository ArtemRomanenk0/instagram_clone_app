class Post < ApplicationRecord
    belongs_to :user
    mount_uploader :image, PostImageUploader
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    validates :text, presence: true 
    def likes_count
      likes.count
    end
    
    def liked_by?(user)
      likes.exists?(user: user)
    end
  end