class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:show]

  def index
    users = User.where.not(id: current_user.id)
    render json: users, 
           each_serializer: UserSerializer,
           current_user: current_user 
  end

  def show
    user = User.includes(:posts).find(params[:id])
    render json: {
      user: UserSerializer.new(user, scope: current_user),
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
target_user = User.find(params[:id])
current_user.follow(target_user)
target_user.reload

render json: {
  target_user: UserSerializer.new(target_user, scope: current_user)
}
end

def unfollow
target_user = User.find(params[:id])
current_user.unfollow(target_user)
target_user.reload

render json: {
  target_user: UserSerializer.new(target_user, scope: current_user)
}
end



private

def render_forbidden(message)
  render json: { error: message }, status: :forbidden
end

  def user_params
    params.require(:user).permit(:username, :email, :avatar)
  end
end