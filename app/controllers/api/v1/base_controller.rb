class Api::V1::BaseController < ActionController::API
  respond_to :json # Явно указываем формат ответов

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    @current_user = User.find_by(authentication_token: token)
    render json: { error: 'Unauthorized' }, status: 401 unless @current_user
  end
    def not_found
    render json: { error: "Not Found" }, status: :not_found
  end
end

