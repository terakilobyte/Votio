defmodule Votio.TopicView do
  use Votio.Web, :view

  def render("index.json", %{topics: topics}) do
    %{data: render_many(topics, Votio.TopicView, "topic.json")}
  end

  def render("show.json", %{topic: topic}) do
    %{data: render_one(topic, Votio.TopicView, "topic.json")}
  end

  def render("topic.json", %{topic: topic}) do
    %{id: topic.id,
      title: topic.title,
      categories: topic.categories}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end


end
