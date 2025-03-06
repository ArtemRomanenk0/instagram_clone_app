class Api::V1::PostsController < Api::V1::BaseController
  def index
    posts = current_user.feed_posts.order(created_at: :desc)
    render json: posts, each_serializer: PostSerializer
  end
def search
    @posts = Post.where("text LIKE ?", "%#{params[:query]}%")
    render json: @posts
  end

  def create
    post = current_user.posts.build(post_params)
    if post.save
      render json: post, serializer: PostSerializer, status: 201
    else
      render json: { errors: post.errors }, status: 422
    end
  end

  private

  def post_params
     params.permit(:text, :image, :user_id)
  end
end
