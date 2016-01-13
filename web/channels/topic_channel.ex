defmodule Votio.TopicChannel do
  use Votio.Web, :channel
  use Guardian.Channel

  alias Votio.TopicView
  alias Votio.Topic

  def join("topics:summary", _, socket) do
    resp = Phoenix.View.render_many(Repo.all(Topic), TopicView, "show.json")
    {:ok, resp, socket}
  end

  def join("topics:lobby", %{claims: claim, resource: resource}, socket) do
    {:ok, %{ message: "#{resource.name} joined"}, socket}
  end

  def join("topics:lobby", _, socket) do
    {:error, %{error: "authentication required"}}
  end

  def handle_in("ping", _payload, socket) do
    user = Guardian.Channel.current_resource(socket)
    push socket, "pong", %{ message: "pong", from: user.email}
    {:reply, :ok, socket}
  end

  def handle_in("new_topic", %{"message" => payload}, socket) do
    changeset = Topic.changeset(%Topic{}, payload)
    case Repo.insert(changeset) do
      {:ok, topic} ->
        broadcast socket, "new_topic", Phoenix.View.render_one(topic, TopicView, "show.json")
      {:error, changeset} ->
        push socket, "error", %{message: changeset.errors}
    end
    {:reply, :ok, socket}
  end

  def handle_in("topic_vote", %{"message" => payload}, socket) do
    topic = Repo.get(Topic, payload.id)
    changeset = Topic.vote_changeset(topic, payload)
    case Repo.update(changeset) do
      {:ok, topic} ->
        broadcast socket, "topic_vote", Phoenix.View.render_one(topic, TopicView, "show.json")
      {:error, changeset} ->
        push socket, "error", %{message: changeset.errors}
    end
    {:reply, :ok, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (votes:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

end
