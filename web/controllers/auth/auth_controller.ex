defmodule Votio.AuthController do
  use Votio.Web, :controller

  @moduledoc """
  Handles the Überauth integration.
  This controller implements the request and callback phases for all providers.
  The actual creation and lookup of users/authorizations is handled by UserFromAuth
  """

  plug Ueberauth

  alias Votio.UserFromAuth

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params, current_user, _claims) do
    case UserFromAuth.get_or_insert(auth, current_user, Repo) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Signed in as #{user.name}")
        |> Guardian.Plug.sign_in(user, :token, perms: %{default: Guardian.Permissions.max})
        |> redirect(to: "/fetch-user")

      {:error, _reason} ->
        conn
        |> redirect(to: "/login-error")
    end
  end

  def logout(conn, _params, current_user, _claims) do
    if current_user do
      conn
      # This clears the whole session.
      # We could use sign_out(:default) to just revoke this token
      # but I prefer to clear out the session. This means that because we
      # use tokens in two locations - :default and :admin - we need to load it (see above)
      |> Guardian.Plug.sign_out
      |> put_flash(:info, "Signed out")
      |> redirect(to: "/")
    else
      conn
      |> put_flash(:info, "Not logged in")
      |> redirect(to: "/")
    end
  end

  def credentials(conn, _, nil, _) do
    conn
    |> put_status(401)
    |> render "failed_credentials.json", error: "not_authenticated"
  end

  def credentials(conn, _params, current_user, {:ok, claims}) do
    token = Guardian.Plug.current_token(conn)
    user = %{name: current_user.name, email: current_user.email}
    render conn, "credentials.json", %{ user: user, exp: claims["exp"], jwt: token }
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render "failed_credentials.json", error: "not_authenticated"
  end

  defp auths(nil), do: []
  defp auths(%Votio.User{} = user) do
    Ecto.Model.assoc(user, :authorizations)
      |> Repo.all
      |> Enum.map(&(&1.provider))
  end
end
