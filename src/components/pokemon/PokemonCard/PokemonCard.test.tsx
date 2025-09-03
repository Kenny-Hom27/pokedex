import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

test("renders a Pokemon card", () => {
  render(<PokemonCard id={1} name="bulbasaur" />);
  expect(screen.getByRole("heading", { name: "bulbasaur" })).toBeVisible();
});
