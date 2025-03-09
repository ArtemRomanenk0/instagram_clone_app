
require 'rspec/core'
require 'rswag/specs'

RSpec.configure do |config|
  config.swagger_root = Rails.root.join('swagger').to_s
  config.swagger_docs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.3',
      info: {
        title: 'Instagram Clone API',
        version: 'v1'
      },
      servers: [
        { url: 'http://localhost:3000' }
      ]
    }
  }
end           
