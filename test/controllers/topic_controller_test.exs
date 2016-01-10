defmodule Votio.TopicControllerTest do
  use Votio.ConnCase
  import Votio.Factory

  alias Votio.Topic

  @valid_attrs %{categories: %{yep: 0, nope: 0}, title: "some content"}
  @invalid_attrs %{}


  setup %{conn: conn} do
    user = create(:user)
    {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)
    {:ok, %{user: user, jwt: jwt, claims: full_claims}}
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    {:ok, conn: put_req_header(conn, "authorization", "Bearer #{jwt}")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, topic_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    topic = Repo.insert! %Topic{}
    conn = get conn, topic_path(conn, :show, topic)
    assert json_response(conn, 200)["data"] == %{"id" => topic.id,
      "title" => topic.title,
      "categories" => topic.categories}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, topic_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, topic_path(conn, :create), topic: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Topic, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, topic_path(conn, :create), topic: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    topic = Repo.insert! %Topic{}
    conn = put conn, topic_path(conn, :update, topic), topic: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Topic, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    topic = Repo.insert! %Topic{}
    conn = put conn, topic_path(conn, :update, topic), topic: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    topic = Repo.insert! %Topic{}
    conn = delete conn, topic_path(conn, :delete, topic)
    assert response(conn, 204)
    refute Repo.get(Topic, topic.id)
  end

  test "topics is a protected resource" do
    conn = get conn, topic_path(conn, :index)
    assert json_response(conn, 401)
  end
end
