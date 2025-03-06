class Api::V1::UsersController < Api::V1::BaseController
  def index
    users = User.where.not(id: current_user.id)
    render json: users, each_serializer: UserSerializer
  end

  def show
    user = User.find(params[:id])
    render json: user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

   def follow
    user = User.find(params[:id])
    current_user.follow(user)
    render json: { message: "Вы подписались на #{user.username}" }, status: 200
  end

  def unfollow
    user = User.find(params[:id])
    current_user.unfollow(user)
    render json: { message: "Вы отписались от #{user.username}" }, status: 200
  end
end
