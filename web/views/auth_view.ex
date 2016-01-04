defmodule Votio.AuthView do
  use Votio.Web, :view

  def render("login.json", %{user: user, jwt: jwt, exp: exp}) do
    %{user: user, jwt: jwt, exp: exp}
  end

end
