defmodule Votio.PageController do
  use Votio.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def index(conn, _params, _something, _else) do
    render conn, "index.html"
  end

end
