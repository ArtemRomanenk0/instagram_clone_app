class Post < ApplicationRecord
    belongs_to :user
    mount_uploader :image, PostImageUploader
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    validates :text, presence: true # Совпадает с параметром из фронтенда
  end