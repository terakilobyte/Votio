defmodule Votio.TestController do
  use Votio.Web, :controller
  plug Guardian.Plug.EnsureAuthenticated, handler: __MODULE__

  # TODO debug this

  def index(conn, _params, current_user, {:ok, claims}) do
    user = Guardian.Plug.current_resource(conn)
    conn
    |> render "index.json", %{message: "this is a test and you should only see it if you are logged in via jwt"}
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render "error.json", %{error: "unauthorized"}
  end
end
