class Api::V1::PostsController < Api::V1::BaseController
  def index
    posts = current_user.feed_posts.order(created_at: :desc)
    render json: posts, each_serializer: PostSerializer
  end
def search
    @posts = Post.where("text LIKE ?", "%#{params[:query]}%")
    render json: @posts
  end
def show
    post = Post.find(params[:id])
    render json: post
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Post not found" }, status: :not_found
  end
  def create
    post = current_user.posts.build(post_params)
    if post.save
      render json: post, serializer: PostSerializer, status: 201
    else
      render json: { errors: post.errors }, status: 422
    end
  end

  def destroy
    post = current_user.posts.find(params[:id])
    post.destroy!
    head :no_content
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Post not found" }, status: :not_found
  end

  private

  def post_params
     params.permit(:text, :image, :user_id)
  end
end
