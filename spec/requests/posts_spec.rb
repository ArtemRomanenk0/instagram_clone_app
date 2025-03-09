require 'swagger_helper'

RSpec.describe 'Posts API', type: :request do
  path '/api/v1/posts' do
    get 'Список постов' do
      tags 'Посты'
      produces 'application/json'

      response '200', 'Успешно' do
        run_test!
      end
    end
  end
end
