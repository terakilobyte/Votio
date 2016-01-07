defmodule Votio.TestMessageController do
  use Votio.Web, :controller

  alias Votio.TestMessage

  plug Guardian.Plug.EnsureAuthenticated, handler: __MODULE__

  def index(conn, _params, current_user, {:ok, claims}) do
    user = Guardian.Plug.current_resource(conn)
    conn
    |> render("test_message.json", %{test_message: "Yo dawg"})
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render "error.json", %{error: "unauthorized"}
  end

end
