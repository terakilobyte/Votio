defmodule Votio.TestControllerTest do
  use Votio.ConnCase

  alias Votio.Test
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, test_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    test = Repo.insert! %Test{}
    conn = get conn, test_path(conn, :show, test)
    assert json_response(conn, 200)["data"] == %{"id" => test.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, test_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, test_path(conn, :create), test: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Test, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, test_path(conn, :create), test: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    test = Repo.insert! %Test{}
    conn = put conn, test_path(conn, :update, test), test: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Test, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    test = Repo.insert! %Test{}
    conn = put conn, test_path(conn, :update, test), test: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    test = Repo.insert! %Test{}
    conn = delete conn, test_path(conn, :delete, test)
    assert response(conn, 204)
    refute Repo.get(Test, test.id)
  end
end
