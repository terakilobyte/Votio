defmodule Votio.AuthView do
  use Votio.Web, :view

  def render("credentials.json", %{user: user, exp: exp, jwt: jwt}) do
    %{user: user, jwt: jwt, exp: exp}
  end

  def render("failed_credentials.json", %{error: error}) do
    %{error: error}
  end

end
