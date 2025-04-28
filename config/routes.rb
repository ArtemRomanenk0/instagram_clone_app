Rails.application.routes.draw do
  
  devise_for :users
  resources :posts
  resources :users, only: [:show] do
    resources :subscriptions, only: [:create, :destroy]
  end
  get '/search', to: 'search#posts', as: :search_posts
  get '/favicon.ico', to: proc { [204, {}, []] }
  root 'posts#index'

 
  namespace :api do
    namespace :v1 do
      post '/auth/login', to: 'auth#login'
      delete '/logout', to: 'auth#logout'
      post '/auth/signup', to: 'registrations#create'
      get 'users/me', to: 'users#me'
      get 'users/:id/posts', to: 'users#posts'
      post 'users/:id/follow', to: 'users#follow'
    post 'users/:id/unfollow', to: 'users#unfollow'
    get 'posts/search', to: 'posts#search' 
       get 'search/posts', to: 'search#posts'
   get '/uploads/*path', to: 'uploads#show'
    get 'users/:id/follow-status', to: 'users#follow_status'
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        resources :likes, only: [:create, :destroy]
        resources :comments, only: [:index, :create]
        collection do
          get :search
        end
      end

      resources :users do
        post :follow, on: :member
        post :unfollow, on: :member
        get :posts, on: :member
      end
    end
  end
end