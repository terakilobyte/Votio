defmodule Votio.Repo.Migrations.UniqueTopics do
  use Ecto.Migration

  def change do
    create unique_index(:topics, [:title])
  end
end
