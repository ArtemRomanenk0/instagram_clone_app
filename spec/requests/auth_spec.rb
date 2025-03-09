RSpec.describe 'Auth API', type: :request do
  path '/api/v1/auth/login' do
    post 'Логин' do
      tags 'Аутентификация'
      consumes 'application/json'
      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: %w[email password]
      }

      response '200', 'Успешная аутентификация' do
        let(:credentials) { { email: 'test@example.com', password: 'password' } }
        run_test!
      end

      response '401', 'Ошибка авторизации' do
        let(:credentials) { { email: 'wrong@example.com', password: 'wrong' } }
        run_test!
      end
    end
  end
end
