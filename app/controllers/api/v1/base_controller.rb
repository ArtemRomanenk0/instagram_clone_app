class Api::V1::BaseController < ActionController::API
  respond_to :json 

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  
  before_action :authenticate_user!

  private
  def set_active_storage_host
    ActiveStorage::Current.url_options = {
      host: request.base_url,
      protocol: request.protocol
    }
  end

  def authenticate_user!
  token = request.headers['Authorization']&.split('Bearer ')&.last
  @current_user = User.find_by(authentication_token: token)
  
 
  unless @current_user
    render json: { error: 'Unauthorized' }, status: :unauthorized
    return
  end
end
    def not_found
    render json: { error: "Not Found" }, status: :not_found
  end
end

