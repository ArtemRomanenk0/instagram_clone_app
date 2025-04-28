Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost' # Единый домен через Nginx
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options],
      expose: ['Authorization'],
      credentials: true
  end
end