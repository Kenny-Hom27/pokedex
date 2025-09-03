import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import PokemonListPage from "./PokemonListPage";
import { fetchPokemonList } from "../../utils/api";
import { ARIA_LOAD_MORE_POKEMON } from "../../constants";

jest.mock("../../utils/api", () => ({
  fetchPokemonList: jest.fn(),
}));

const mockedFetch = fetchPokemonList as jest.Mock;

const user = userEvent.setup();

const firstPage = {
  results: [
    { name: "bulbasaur", url: "/pokemon/1" },
    { name: "ivysaur", url: "/pokemon/2" },
  ],
};

const secondPage = {
  results: [{ name: "venusaur", url: "/pokemon/3" }],
};

describe("<PokemonListPage />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders header and initial Pokemon list", async () => {
    mockedFetch.mockResolvedValueOnce(firstPage);

    render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("bulbasaur")).toBeVisible();
    expect(await screen.findByText("ivysaur")).toBeVisible();

    expect(mockedFetch).toHaveBeenCalledWith(0, expect.any(Number));
  });

  test("loads more Pokemon when Show More clicked", async () => {
    mockedFetch.mockImplementation((offset: number) => {
      if (offset === 0) return Promise.resolve(firstPage);
      if (offset === 20) return Promise.resolve(secondPage);
      return Promise.resolve({ results: [] });
    });

    render(
      <MemoryRouter>
        <PokemonListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("bulbasaur")).toBeVisible();

    const button = await screen.findByRole("button", {
      name: ARIA_LOAD_MORE_POKEMON,
    });
    await user.click(button);

    expect(await screen.findByText("venusaur")).toBeVisible();
  });
});
