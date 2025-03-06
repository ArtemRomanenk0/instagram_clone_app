class AddAuthenticationTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    unless column_exists?(:users, :authentication_token)
      add_column :users, :authentication_token, :string
      add_index :users, :authentication_token, unique: true
    end
  end
end
