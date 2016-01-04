defmodule Votio.TestView do
  use Votio.Web, :view

  def render("index.json", %{message: message}) do
    %{message: message}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end

end
