module Api
    module V1
      class RegistrationsController < BaseController
        skip_before_action :authenticate_user!
  
        def create
          user = User.new(user_params)
          if user.save
            render json: { 
              message: 'User created', 
              user: user.as_json(only: [:id, :email, :username, :authentication_token]) 
            }, status: :created
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        end
        
        private
        
        def user_params
          params.require(:user).permit(:email, :password, :username)
        end
      end
    end
  end