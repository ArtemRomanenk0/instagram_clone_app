Rails.application.routes.draw do
  # Web routes
  devise_for :users
  resources :posts
  resources :users, only: [:show] do
    resources :subscriptions, only: [:create, :destroy]
  end
  get '/search', to: 'search#posts', as: :search_posts
  root 'posts#index'

  # API routes
  namespace :api do
    namespace :v1 do
      # Authentication
      post '/login', to: 'auth#login'
      delete '/logout', to: 'auth#logout'

      # Posts with search
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        collection do
           get :search
          end
      end

      # Users with follow/unfollow
      resources :users, only: [:index, :show] do
        member do
          post :follow
          delete :unfollow
        end
      end
    end
  end
end
