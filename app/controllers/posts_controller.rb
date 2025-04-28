class PostsController < ApplicationController
  before_action :authenticate_user!

    def index
    @posts = current_user.feed_posts.order(created_at: :desc)
  end

   def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      render json: @post, status: :created 
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:text, :image, :user_id)
  end
end
