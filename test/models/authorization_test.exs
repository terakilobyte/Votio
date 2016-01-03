defmodule Votio.AuthorizationTest do
  use Votio.ModelCase

  alias Votio.Authorization

  @valid_attrs %{expires_at: 42, password: "some content", password_confirmation: "some content", provider: "some content", refresh_token: "some content", token: "some content", uid: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Authorization.changeset(%Authorization{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Authorization.changeset(%Authorization{}, @invalid_attrs)
    refute changeset.valid?
  end
end
