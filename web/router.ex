defmodule Votio.Router do
  use Votio.Web, :router
  require Ueberauth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  # Guardian
  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # This pipeline if intended for API requests and looks for the JWT in the "Authorization" header
  # In this case, it should be prefixed with "Bearer" so that it's looking for
  # Authorization: Bearer <jwt>
  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Votio do
    pipe_through [:api, :api_auth]

    get "/test", TestController, :index
  end

  scope "/auth", Votio do
    pipe_through [:browser, :browser_auth]

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/:provider/callback", AuthController, :callback
    delete "/logout", AuthController, :delete
  end


  scope "/", Votio do
    pipe_through [:browser, :browser_auth] # Use the default browser stack

    get "/credentials", AuthController, :credentials
    get "/*any", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Votio do
  #   pipe_through :api
  # end
end
