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

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Votio do
    pipe_through :api

    get "/test", TestController, :index
  end

  scope "/auth", Votio do
    pipe_through [:browser]

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/:provider/callback", AuthController, :callback
    delete "/logout", AuthController, :delete
  end

  scope "/", Votio do
    pipe_through :browser # Use the default browser stack

    get "/*any", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Votio do
  #   pipe_through :api
  # end
end
