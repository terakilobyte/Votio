defmodule Votio.TopicTest do
  use Votio.ModelCase

  alias Votio.Topic

  @valid_attrs %{categories: %{option1: 0, option2: 0}, title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Topic.changeset(%Topic{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Topic.changeset(%Topic{}, @invalid_attrs)
    refute changeset.valid?
  end

end
