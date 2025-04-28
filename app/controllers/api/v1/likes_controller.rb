class Api::V1::LikesController < Api::V1::BaseController
    before_action :authenticate_user!
  
    def create
        post = Post.find(params[:post_id])
        like = post.likes.create!(user: current_user)
        render json: {
          likes_count: post.reload.likes.size,
          is_liked: true,
          like_id: like.id
        }, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
  
      def destroy
        like = current_user.likes.find(params[:id])
        post = like.post 
        like.destroy!
        render json: { 
          likes_count: post.reload.likes.size,
          is_liked: false 
        }, status: :ok
      end
  end