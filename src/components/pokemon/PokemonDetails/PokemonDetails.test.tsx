import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonDetails from "./PokemonDetails";
import type { Pokemon } from "../../../types/pokemon";

const mockPokemon = {
  name: "pikachu",
  stats: [{ stat: { name: "hp" }, base_stat: 35 }],
  sprites: { front_default: "pikachu.png" },
  types: [{ slot: 1, type: { name: "electric" } }],
  cries: { latest: "pikachu.mp3" },
};

describe("<PokemonDetails />", () => {
  beforeEach(() => {
    render(<PokemonDetails pokemon={mockPokemon as Pokemon} />);
  });

  test("renders Pokemon details", () => {
    expect(screen.getByRole("heading", { name: "pikachu" })).toBeVisible();
    expect(screen.getByText("HP 35")).toBeVisible();
    expect(screen.getByText("electric")).toBeVisible();
  });

  test("plays cry when attack button clicked", async () => {
    const user = userEvent.setup();
    window.HTMLMediaElement.prototype.play = jest.fn();

    const attackButton = await screen.findByRole("button", {
      name: `pikachu's cry`,
    });
    await user.click(attackButton);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
