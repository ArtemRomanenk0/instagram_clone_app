require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user1 = users(:user1)
    @user2 = users(:user2)
  end

  test "should follow and unfollow a user" do
    assert_not @user1.following?(@user2)
    @user1.follow(@user2)
    assert @user1.following?(@user2)
    assert @user2.followers.include?(@user1)
    @user1.unfollow(@user2)
    assert_not @user1.following?(@user2)
  end
end
