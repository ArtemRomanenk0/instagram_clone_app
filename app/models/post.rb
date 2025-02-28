class Post < ApplicationRecord
mount_uploader :image, ImageUploader
validates :text, :image, presence: true
belongs_to :user
end
