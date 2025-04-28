class PostImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  process resize_to_limit: [800, 800]
  def base_url
    "http://localhost" 
  end
  


  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
  def image_url
    if object.image.present?
  
      "/uploads/post/image/#{object.id}/#{object.image_identifier}"
    else
      "/placeholder.png"
    end
  end

  def filename
    "image.#{file.extension}" if original_filename.present?
  end

  def extension_allowlist
    %w(jpg jpeg gif png)
  end
end