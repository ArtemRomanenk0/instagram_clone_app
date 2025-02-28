Rails.application.routes.draw do
  get "subscriptions/create"
  get "subscriptions/destroy"
  get "posts/index"
  get "posts/new"
  get "posts/create"
  get "posts/show"



  devise_for :users
resources :posts
resources :users, only: [:show] do
  resources :subscriptions, only: [:create, :destroy]


end
get '/search', to: 'search#posts', as: :search_posts
root 'posts#index'

end
