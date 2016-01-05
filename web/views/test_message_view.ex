defmodule Votio.TestMessageView do
  use Votio.Web, :view

  def render("test_message.json", %{test_message: test_message}) do
    %{id: test_message}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end


end
