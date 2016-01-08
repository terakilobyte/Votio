defmodule Votio.Repo.Migrations.CreateTopic do
  use Ecto.Migration

  def change do
    create table(:topics) do
      add :title, :string
      add :categories, :map
      add :voted_by, {:array, :id}

      timestamps
    end

  end
end
