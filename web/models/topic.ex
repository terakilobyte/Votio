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
  end

end
