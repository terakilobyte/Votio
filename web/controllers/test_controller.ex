defmodule Votio.TestController do
  use Votio.Web, :controller

  def index(conn, _params) do
    render(conn, "index.json", %{test: %{isATest: "this is a test"}})
  end
end
