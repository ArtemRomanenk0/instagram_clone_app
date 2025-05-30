class UploadsController < ApplicationController
    skip_before_action :authenticate_user!
  
    def show
      path = Rails.root.join('public', 'uploads', params[:path])
      if File.exist?(path)
        send_file path, disposition: 'inline'
      else
        render plain: "Image not found", status: 404
      end
    end
  end