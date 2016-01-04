defmodule Votio.TestView do
  use Votio.Web, :view

  def render("index.json", %{message: message}) do
    %{message: message}
  end

  def render("error.json", %{test: test}) do
    %{error: test}
  end

  def render("login.json", %{data: data}) do
    %{data: data}
  end

end
