import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PokemonDetailsPage from "./PokemonDetailsPage";
import { fetchPokemonById } from "../../utils/api";
import { POKEMON_LOADING_ERROR } from "../../constants";

jest.mock("../../utils/api", () => ({
  fetchPokemonById: jest.fn(),
}));

const mockedFetch = fetchPokemonById as jest.Mock;

const mockPokemon = {
  name: "pikachu",
  stats: [{ stat: { name: "hp" }, base_stat: 35 }],
  sprites: { front_default: "pikachu.png" },
  types: [{ slot: 1, type: { name: "electric" } }],
  cries: { latest: "pikachu.mp3" },
};

describe("<PokemonDetailsPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading then Pokémon details", async () => {
    mockedFetch.mockResolvedValueOnce(mockPokemon);

    render(
      <MemoryRouter initialEntries={["/pokemon/25"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("heading", { name: "pikachu" })
    ).toBeVisible();
    expect(await screen.findByText("HP 35")).toBeVisible();
    expect(await screen.findByText("electric")).toBeVisible();

    expect(
      screen.getByRole("button", { name: "Go to previous Pokémon: ID 24" })
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Go to previous Pokémon: ID 26" })
    ).toBeVisible();
  });

  test("renders error when fetch fails", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("fail"));

    render(
      <MemoryRouter initialEntries={["/pokemon/25"]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(POKEMON_LOADING_ERROR)).toBeVisible();
  });
});
