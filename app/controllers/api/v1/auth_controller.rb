class Api::V1::AuthController < Api::V1::BaseController
  skip_before_action :authenticate_user!
  before_action :verify_logged_out, only: [:login]

  def login
    return render json: { error: "Параметры отсутствуют" }, status: :bad_request unless params[:user]
  
    email = params[:user][:email]&.downcase
    password = params[:user][:password]
  
    user = User.find_by(email: email)
    if user&.valid_password?(password)
      render json: { token: user.authentication_token }
    else
      render json: { error: "Неверный email или пароль" }, status: :unauthorized
    end
  end

  def logout
    if current_user
      current_user.update(authentication_token: nil)
      head :no_content
    else
      render json: { error: "Not authenticated" }, status: :unauthorized
    end
  end

  private

  def render_unauthorized
    render json: { error: "Email and password are required" }, status: :bad_request
  end

  def verify_logged_out
    return unless current_user
    render json: { error: "Already logged in" }, status: :conflict
  end
end
