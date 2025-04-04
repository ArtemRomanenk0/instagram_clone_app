class Api::V1::SearchController < Api::V1::BaseController
    def posts
      posts = Post.where("text LIKE ?", "%#{params[:query]}%")
                 .includes(:user)
                 .order(created_at: :desc)
      
      render json: posts, each_serializer: PostSerializer
    end
  end