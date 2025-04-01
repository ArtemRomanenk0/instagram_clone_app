class Post < ApplicationRecord
mount_uploader :image, PostImageUploader
validates :text, :image, presence: true
belongs_to :user
end 
я