defmodule Votio.Repo.Migrations.CreateAuthorization do
  use Ecto.Migration

  def change do
    create table(:authorizations) do
      add :provider, :string
      add :uid, :string
      add :user_id, references(:users, on_delete: :delete_all)
      add :token, :text
      add :refresh_token, :text
      add :expires_at, :bigint


      timestamps
    end
  end
end
