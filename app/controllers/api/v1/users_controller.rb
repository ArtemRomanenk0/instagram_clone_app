class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:show]

  def index
    users = User.where.not(id: current_user.id)
    render json: users, 
           each_serializer: UserSerializer,
           current_user: current_user # Ключевое исправление!
  end

  def show
    user = User.includes(:posts).find(params[:id])
    render json: {
      user: UserSerializer.new(user),
      posts: ActiveModel::Serializer::CollectionSerializer.new(
        user.posts.order(created_at: :desc), 
        serializer: PostSerializer
      )
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def me
  return head :not_found unless current_user
  render json: current_user
end

  def follow_status
    user = User.find(params[:id])
    render json: { 
      is_following: current_user.following?(user),
      followers_count: user.followers.count
    }
  end
  
  def posts
    user = User.find(params[:id])
    render json: user.posts
  end

  def follow
    user = User.find(params[:id])
    return render json: { error: "Can't follow yourself" }, status: 422 if current_user.id == user.id

    current_user.follow(user)
    render json: { 
      message: "Подписка оформлена",
      is_following: true,
      followers_count: user.followers.count
    }
  end

  def unfollow
    user = User.find(params[:id])
    current_user.unfollow(user)
    render json: { 
      message: "Подписка отменена",
      is_following: false,
      followers_count: user.followers.count
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :avatar)
  end
end