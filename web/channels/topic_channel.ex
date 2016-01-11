defmodule Votio.TopicChannel do
  use Votio.Web, :channel
  use Guardian.Channel

  use Votio.Topic

  def join("topics:lobby", %{claims: claim, resource: resource}, socket) do
    {:ok, %{ message: "Joined"}, socket}
  end

  def join("topics:lobby", _, socket) do
    {:error, %{error: "authentication required"}}
  end

  def handle_in("ping", _payload, socket) do
    user = Guardian.Channel.current_resource(socket)
    push socket, "pong", %{ message: "pong", from: user.email}
    {:reply, :ok, socket}
  end

  def handle_in("new_topic", payload = %{topic: topic, categories: categories}, socket) do
    push socket, payload
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
