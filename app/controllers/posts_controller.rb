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
      redirect_to posts_path
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:text, :image, :user_id)
  end
end
