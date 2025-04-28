class ImageUploader < CarrierWave::Uploader::Base

  storage :file
  def store_dir
    "public/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
 
  def extension_whitelist
    %w[jpg jpeg gif png]
  end

 
  def filename
    "image.#{file.extension}" if original_filename.present?
  end
end
