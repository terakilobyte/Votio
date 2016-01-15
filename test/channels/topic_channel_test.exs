defmodule Votio.TopicChannelTest do
  use Votio.ChannelCase

  alias Votio.TopicChannel
  alias Votio.Topic
  alias Votio.TopicView
  import Votio.Factory

  @valid_attrs %{"data" => %{"categories" => %{"yep" => 0, "nope" => 0}, "title" => "some content"}}
  @invalid_attrs %{}

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

  test "updates the db on new_topic and broadcasts the topic", %{socket: socket} do
    push socket, "new_topic", @valid_attrs
    assert_broadcast "new_topic", %{data: %{categories: %{"yep" => 0, "nope" => 0}, id: _, title: "some content"}}
    assert Repo.get_by(Topic, [title: "some content", categories: %{"yep" => 0, "nope" => 0}])
  end

  test "handles voting and broadcasts the change", %{socket: socket} do
    changeset = Topic.vote_changeset(%Topic{}, Map.get(@valid_attrs, "data"))
    {:ok, topic} =
      Repo.insert!(changeset)
      |> Phoenix.View.render_one(TopicView, "show.json")
      |> Map.get(:data)
      |> update_in([:categories, "yep"], &(&1 + 1))
      |> Poison.encode
    {:ok, json} = Poison.decode topic
    push socket, "vote", %{"data" => json}
    assert_broadcast "vote", topic
    the_topic = Repo.get(Topic, topic.data.id)
    IO.inspect the_topic
    assert Map.get(Repo.get(Topic, topic.data.id).categories, "yep") == 1
  end
end
