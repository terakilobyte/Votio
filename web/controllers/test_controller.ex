defmodule Votio.TestController do
  use Votio.Web, :controller
  plug Guardian.Plug.EnsureAuthenticated, handler: __MODULE__

  # TODO debug this

  def index(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    IO.inspect user
    conn
    |> render "index.json", %{message: "this is a test and you should only see it if you are logged in via jwt"}
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render "error.json", %{message: "unauthorized"}
  end

end
