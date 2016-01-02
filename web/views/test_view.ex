defmodule Votio.TestView do
  use Votio.Web, :view

  # def render("index.json", %{tests: tests}) do
  #   %{data: render_many(tests, Votio.TestView, "test.json")}
  # end

  def render("index.json", %{test: test}) do
    %{data: render_one(test, Votio.TestView, "test.json")}
  end

  def render("test.json", %{test: test}) do
    %{isATest: test.isATest}
  end
end
