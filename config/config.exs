# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :votio, Votio.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "l68ynKTbxO5EH1yrNvMXjyjHz/VIsS6Fae/tu14iwOhC+KS4qkupKETxzrrLripV",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Votio.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false


  # Configure guardian
config :guardian, Guardian,
  issuer: "Votio.#{Mix.env}",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Votio.GuardianSerializer,
  secret_key: to_string(Mix.env),
  hooks: GuardianDb,
  permissions: %{
    default: [
      :read_profile,
      :write_profile,
      :read_token,
      :revoke_token,
    ],
  }


# Configure Ueberauth
config :ueberauth, Ueberauth,
  providers: [
    github: { Ueberauth.Strategy.Github, [uid_field: "login"] },
    identity: { Ueberauth.Strategy.Identity, [callback_methods: ["POST"], uid_field: :username, nickname_field: :username,
      ] },
    twitter: { Ueberauth.Strategy.Twitter, []}
  ]

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
  client_id: System.get_env("GITHUB_CLIENT_ID"),
  client_secret: System.get_env("GITHUB_CLIENT_SECRET")

config :guardian_db, GuardianDb,
  repo: Votio.Repo

  # Import environment specific config. This must remain at the bottom
  # of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
