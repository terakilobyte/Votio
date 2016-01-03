defmodule Votio.GuardianToken do
  use Votio.Web, :model

  alias Votio.Repo
  alias Votio.GuardianSerializer

  @primary_key {:jti, :string, []}
  @derive {Phoenix.Param, key: :jti}

  schema "guardian_tokens" do
    field :aud, :string
    field :iss, :string
    field :sub, :string
    field :exp, :string
    field :jwt, :string
    field :claims, :string

    timestamps
  end

  def for_user(user) do
    case GuardianSerializer.for_token(user) do
      {:ok, aud} ->
      (from t in Votio.GuardianToken, where: t.sub == ^aud)
        |> Repo.all
      _ -> []
    end
  end

 end
