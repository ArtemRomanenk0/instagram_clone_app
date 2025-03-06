class Api::V1::AuthController < Api::V1::BaseController
  skip_before_action :authenticate_user!
  before_action :verify_logged_out, only: [:login]

  def login
    logger.info "Login attempt with params: #{params.permit!}"
    
    user = User.find_for_database_authentication(email: params[:email])
    logger.info "Found user: #{user.inspect}"

    if user&.valid_password?(params[:password])
      logger.info "Password valid for user #{user.id}"
      user.regenerate_authentication_token!
      render json: {
        token: user.authentication_token,
        user_id: user.id,
        email: user.email
      }, status: :ok
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
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

  def verify_logged_out
    return unless current_user
    render json: { error: "Already logged in" }, status: :conflict
  end
end
