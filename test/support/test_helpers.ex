defmodule Votio.TestHelpers do

  alias Votio.Repo

  @valid_attrs %{categories: %{option1: 0, option2: 0}, title: "some content"}

  def insert_topic(attrs \\ @valid_attrs) do
    changes = Dict.merge(%{}, attrs)

    %Votio.Topic{}
    |> Votio.Topic.changeset(changes)
    |> Repo.insert
  end

end
