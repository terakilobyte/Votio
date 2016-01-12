defmodule Votio.TopicControllerAuthorizationTest do
  use Votio.ConnCase
  import Votio.Factory

  alias Votio.Topic

  @valid_attrs %{categories: %{yep: 0, nope: 0}, title: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    hooks = Application.get_env(:guardian, :hooks)
    Application.put_env(:guardian, :hooks, nil)
    user = create(:user)
    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)
    {:ok, %{user: user, jwt: jwt, claims: full_claims}}
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    {:ok, conn: put_req_header(conn, "authorization", "Bearer #{jwt}")}
    on_exit(make_ref, fn -> Application.put_env(:guardian, :hooks, hooks) end)
    {:ok, []}
  end

  test "topics is a protected resource", %{conn: conn} do
    conn = get conn, topic_path(conn, :index)
    assert json_response(conn, 401)
  end

  test "users must have a valid jwt in guardianDB to access resource", %{conn: conn} do
    conn = get conn, topic_path(conn, :index)
    assert json_response(conn, 401)
  end
end
