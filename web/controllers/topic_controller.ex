defmodule Votio.TopicController do
  use Votio.Web, :controller

 plug Guardian.Plug.EnsureAuthenticated, handler: __MODULE__

  alias Votio.Topic

  plug :scrub_params, "topic" when action in [:create, :update]

  def index(conn, _params, current_user, {:ok, claims}) do
    topics = Repo.all(Topic)
    render(conn, "index.json", topics: topics)
  end

  def create(conn, %{"topic" => topic_params}, current_user, {:ok, claims}) do
    changeset = Topic.changeset(%Topic{}, topic_params)

    case Repo.insert(changeset) do
      {:ok, topic} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", topic_path(conn, :show, topic))
        |> render("show.json", topic: topic)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Votio.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}, current_user, {:ok, claims}) do
    topic = Repo.get!(Topic, id)
    render(conn, "show.json", topic: topic)
  end

  def update(conn, %{"id" => id, "topic" => topic_params}, current_user, {:ok, claims}) do
    topic = Repo.get!(Topic, id)
    changeset = Topic.changeset(topic, topic_params)

    case Repo.update(changeset) do
      {:ok, topic} ->
        render(conn, "show.json", topic: topic)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Votio.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, current_user, {:ok, claims}) do
    topic = Repo.get!(Topic, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(topic)

    send_resp(conn, :no_content, "")
  end


  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render "error.json", %{error: "unauthorized"}
  end

end
