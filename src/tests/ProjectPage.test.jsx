import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//mock the images and project data for unit tests as we are testing functionality not data --> does the component work properly
vi.mock("../components/ImageProvider", () => ({
  default: {
    "me5.jpg": "me5.jpg",
    "test.gif": "test.gif",
    "test.jpg": "test.jpg",
  },
}));

//import the component after the mock data
import ProjectPage from "../pageComponents/ProjectPage";

describe("ProjectPage component", () => {
  //we have to mock the json data before running any tests
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            Projects: [
              {
                Title: "Test Project 1",
                Desc: "First test project description",
                Image: [
                  { img: "test.gif", alt: "Test project image" },
                  { img: "test.jpg", alt: "Test project image" },
                ],
                Year: "2024",
                Res: "https://example.com",
                Filters: ["Web", "React"],
              },
              {
                Title: "Test Project 2",
                Desc: "Second test project description",
                Image: [{ img: "me5.jpg", alt: "Second project image" }],
                Year: "2023",
                Res: "",
                Filters: ["Design"],
              },
            ],
          }),
      }),
    );
  });

  test("that the project list renders properly on page load", async () => {
    //render the component
    render(<ProjectPage />);

    //ensure the mock data is displayed properly, including the description of the title project
    //the top project will be the same as the first project in the list but will be an h2 element
    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "Test Project 1",
      }),
    ).toBeInTheDocument();
    //each project title will end up as an h3 element
    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: "Test Project 1",
      }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: "Test Project 2",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("First test project description"),
    ).toBeInTheDocument();
  });

  test("that clicking on a project updates the main project view", async () => {
    //render the component
    render(<ProjectPage />);
    //-------------SETUP FOR USER EVENT---------------
    //the top project by default will be the same as the first project in the list but will be an h2 element
    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "Test Project 1",
      }),
    ).toBeInTheDocument();
    //each project title will end up as an h3 element
    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: "Test Project 1",
      }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", {
        level: 3,
        name: "Test Project 2",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("First test project description"),
    ).toBeInTheDocument();

    //--------------TEST USER EVENT-------------------

    //regex the name as it includes all the element's info
    const project2Button = await screen.findByRole("button", {
      name: /Test Project 2/i,
    });

    //click on the second project in the list
    await userEvent.click(project2Button);

    //check that the second project now appears as the h2
    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "Test Project 2",
      }),
    ).toBeInTheDocument();

    //check the description is now project 2's description
    expect(
      screen.getByText("Second test project description"),
    ).toBeInTheDocument();
  });
  //clicking on the arrow button chnages the current project image and alt test
  test.todo(
    "that clicking on the image arrow buttons changes the main project image",
  );
});
