class SearchController < ApplicationController
  def posts
    @posts = Post.where("text LIKE ?", "%#{params[:query]}%")
  end
end
