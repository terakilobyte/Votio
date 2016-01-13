defmodule Votio.AuthView do
  use Votio.Web, :view

  def render("credentials.json", %{user: user}) do
    %{user: user}
  end

  def render("failed_credentials.json", %{error: error}) do
    %{error: error}
  end

end
