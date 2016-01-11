defmodule Votio.TopicChannelTest do
  use Votio.ChannelCase

  alias Votio.TopicChannel
  import Votio.Factory

  setup do
    user = create(:user)
    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)
    {:ok, _, socket} =
    socket()
      |> subscribe_and_join(TopicChannel, "topics:lobby", %{"guardian_token" => "#{jwt}"})

    {:ok, socket: socket}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{}
    assert_reply ref, :ok, _
  end

  test "shout broadcasts to topics:lobby", %{socket: socket} do
    push socket, "shout", %{"hello" => "all"}
    assert_broadcast "shout", %{"hello" => "all"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end

  test "valid jwt required to join channel" do
    assert {:error, %{error: "authentication required"}} =
      socket()
    |> join(TopicChannel, "topics:lobby", %{})

  end

  test "joining with no payload fails" do
    assert {:error, %{error: "authentication required"}} =
      socket()
    |> join(TopicChannel, "topics:lobby")
  end

end
