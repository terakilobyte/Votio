defmodule Votio.TopicTest do
  use Votio.ModelCase

  import Votio.TestHelpers, only: [insert_topic: 1]

  alias Votio.Topic

  @valid_attrs %{categories: %{option1: 0, option2: 0}, title: "some content"}
  @invalid_attrs1 %{}
  @invalid_attrs2 %{title: "nope", categories: %{scotch: 0, beer: 0}}
  @invalid_attrs3 %{title: "long enough but no categories"}
  @invalid_attrs4 %{title: "valid title but one category", category: %{nope: 0}}

  @valid_vote Dict.merge @valid_attrs, %{voted_by: [1]}
  @invalid_vote Dict.merge @valid_attrs, %{voted_by: [1, 1]}

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

  test "changeset with only 1 category" do
    changeset = Topic.changeset(%Topic{}, @invalid_attrs4)
    refute changeset.valid?
  end

  test "changeset is invalid with existing topic title" do
    insert_topic(@valid_attrs)
    assert {:error, changeset} = insert_topic(@valid_attrs)
  end

  test "changeset validates if first time user votes on a topic" do
    changeset = Topic.vote_changeset(%Topic{}, @valid_vote)
    assert changeset.valid?
  end

  test "changeset is invalid if trying a repeat vote" do
    changeset = Topic.vote_changeset(%Topic{}, @invalid_vote)
    refute changeset.valid?
  end

end
