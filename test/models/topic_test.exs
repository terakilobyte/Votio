defmodule Votio.TopicTest do
  use Votio.ModelCase

  import Votio.TestHelpers, only: [insert_topic: 1]

  alias Votio.Topic

  @valid_attrs %{categories: %{option1: 0, option2: 0}, title: "some content"}
  @invalid_attrs1 %{}
  @invalid_attrs2 %{title: "nope"}
  @invalid_attrs3 %{title: "long enough but no categories"}

  test "changeset with valid attributes" do
    changeset = Topic.changeset(%Topic{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with no attributes" do
    changeset = Topic.changeset(%Topic{}, @invalid_attrs1)
    refute changeset.valid?
  end

  test "changeset with title too short" do
    changeset = Topic.changeset(%Topic{}, @invalid_attrs2)
    refute changeset.valid?
  end

  test "changeset with no categories" do
    changeset = Topic.changeset(%Topic{}, @invalid_attrs3)
    refute changeset.valid?
  end

  test "changeset is invalid with existing topic title" do
    insert_topic(@valid_attrs)
    case insert_topic(@valid_attrs) do
      {:error, changeset} ->
        refute changeset.valid?
      _ ->
        refute true # this will always fail, we should never hit this
    end
  end

end
