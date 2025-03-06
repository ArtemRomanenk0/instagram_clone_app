
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
  redirect_to root_path, alert: "Пользователь не найден"
  end
end
