class Api::V1::CommentsController < Api::V1::BaseController
    before_action :authenticate_user!
    
    def index
      post = Post.includes(:user, comments: [:user]).find(params[:post_id])
      comments = post.comments.includes(:user).order(created_at: :asc)
      render json: post.comments
    end
  
    def create
        post = Post.find(params[:post_id])
        comment = post.comments.create!(comment_params.merge(user: current_user))
        render json: comment, serializer: CommentSerializer, status: :created
      end
  
    private
    
    def comment_params
      params.require(:comment).permit(:text)
    end
  end