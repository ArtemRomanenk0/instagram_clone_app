class ImageUploader < CarrierWave::Uploader::Base
  # Хранение файлов на локальном диске (для разработки)
  storage :file

  # Папка для загрузки изображений
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Разрешить только изображения
  def extension_whitelist
    %w[jpg jpeg gif png]
  end

  # Имя файла
  def filename
    "image.#{file.extension}" if original_filename.present?
  end
end
