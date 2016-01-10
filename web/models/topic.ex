defmodule Votio.Topic do
  use Votio.Web, :model

  schema "topics" do
    field :title, :string
    field :categories, :map

    field :voted_by, {:array, :id}

    timestamps
  end

  @required_fields ~w(title categories)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:title)
    # Thanks Joef!
    |> validate_change(:categories, fn(:categories, categories) ->
      cond do
        map_size(categories) < 2 -> [categories: "Must have at least two choices."]
        true -> []
      end
    end)
    |> validate_length(:title, min: 5, message: "Your title must be at least 5 characters")
  end

  def vote_changeset(model, params \\ :invalid) do
    model
    |> changeset(params)
    |> cast(params, ~w(voted_by), @optional_fields)
    |> validate_change(:voted_by, fn(:voted_by, list) ->
      cond do
        list == Enum.uniq(list) -> []
        true -> [voted_by: "Already voted"]
      end
    end)
  end

end
