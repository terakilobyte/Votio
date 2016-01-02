defmodule Mix.Tasks.Verify do
  use Mix.Task

  @shortdoc "Run mix and npm tests"

  def run(_) do
    {res, 0} = System.cmd("mix", ["test"])
    IO.puts res
    {res, 0} = System.cmd("npm", ["test"])
    IO.puts res
  end
end
