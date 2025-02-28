class CreateSubscriptions < ActiveRecord::Migration[8.0]
  def change
    create_table :subscriptions do |t|
      t.integer :follower_id
      t.integer :following_id

      t.timestamps
    end
  end
end
