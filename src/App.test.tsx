import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import App from "./App";

const launches = [
  {
    flight_number: 1,
    mission_name: "FalconSat",
    details: "Описание первого запуска",
    links: {
      mission_patch_small: null,
      mission_patch: null,
    },
    rocket: {
      rocket_name: "Falcon 1",
    },
  },
  {
    flight_number: 2,
    mission_name: "DemoSat",
    details: "Описание второго запуска",
    links: {
      mission_patch_small: null,
      mission_patch: null,
    },
    rocket: {
      rocket_name: "Falcon 1",
    },
  },
];

const renderApp = () => {
  return render(
    <MantineProvider env="test">
      <App />
    </MantineProvider>,
  );
};

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response(JSON.stringify({ launches }))),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("should display launches after loading", async () => {
    renderApp();

    expect(screen.getByRole("status")).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "FalconSat" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "DemoSat" }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("Falcon 1")).toHaveLength(2);

    expect(screen.getAllByRole("button", { name: "See more" })).toHaveLength(2);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("should display an error when the request fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Ошибка запроса"));

    renderApp();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Не удалось загрузить запуски. Обновите страницу.",
    );

    expect(
      screen.queryByRole("button", { name: "See more" }),
    ).not.toBeInTheDocument();
  });

  it("should open the selected launch and close the modal", async () => {
    const user = userEvent.setup();

    renderApp();

    const buttons = await screen.findAllByRole("button", {
      name: "See more",
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(buttons[1]);

    const modal = screen.getByRole("dialog", { name: "DemoSat" });

    expect(
      within(modal).getByText("Описание второго запуска"),
    ).toBeInTheDocument();

    expect(within(modal).getByText("Falcon 1")).toBeInTheDocument();

    await user.click(
      within(modal).getByRole("button", { name: "Закрыть окно" }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
