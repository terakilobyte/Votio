defmodule Votio.GuardianTokenTest do
  use Votio.ModelCase

  alias Votio.GuardianToken

  @valid_attrs %{aud: "some content", claims: "some content", exp: "some content", iss: "some content", jwt: "some content", sub: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = GuardianToken.changeset(%GuardianToken{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = GuardianToken.changeset(%GuardianToken{}, @invalid_attrs)
    refute changeset.valid?
  end
end
