import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
/*global test,expect */

// core user flow

// add
test("user can add a new comment", async () => {
  render(<App />);

  const textarea = screen.getByPlaceholderText(/add a comment/i);
  const button = screen.getByRole("button", { name: /send/i });

  await userEvent.type(textarea, "Hello world");
  await userEvent.click(button);

  expect(screen.getByText("Hello world")).toBeInTheDocument();
});

// reply
test("user can reply to a comment", async () => {
  render(<App />);

  const replyBtn = screen.getAllByText(/reply/i)[0];
  await userEvent.click(replyBtn);

  const textareas = screen.getAllByRole("textbox");
  const textarea = textareas[textareas.length - 1];

  await userEvent.type(textarea, "This is a reply");

  const container = textarea.closest(".comment-input");

  const sendBtn = within(container).getByRole("button", {
    name: /send/i,
  });
  await userEvent.click(sendBtn);

  expect(screen.getByText("This is a reply")).toBeInTheDocument();
});

// edit
test("user can edit a comment", async () => {
  render(<App />);

  const editBtn = screen.getAllByText(/edit/i)[0];
  await userEvent.click(editBtn);

  const textareas = screen.getAllByRole("textbox");
  const textarea = textareas[textareas.length - 1];

  await userEvent.clear(textarea);
  await userEvent.type(textarea, "Updated comment");

  const updateBtn = screen.getByRole("button", { name: /update/i });
  await userEvent.click(updateBtn);

  expect(screen.getByText("Updated comment")).toBeInTheDocument();
});

// delete
test("user can delete a comment", async () => {
  render(<App />);

  const deleteBtn = screen.getAllByRole("button", {
    name: /delete/i,
  })[0];

  await userEvent.click(deleteBtn);

  const confirmBtn = screen.getByRole("button", {
    name: /yes, delete/i,
  });

  await userEvent.click(confirmBtn);

  expect(deleteBtn).not.toBeInTheDocument();
});

// upvote
test("user can upvote a comment", async () => {
  render(<App />);

  const plusBtn = screen.getAllByRole("button")[0];
  const score = screen.getByText("12");

  await userEvent.click(plusBtn);

  expect(score).toHaveTextContent("13");
});

// localstorage
test("data is saved to localStorage", async () => {
  render(<App />);

  const textarea = screen.getByPlaceholderText(/add a comment/i);
  const button = screen.getByRole("button", { name: /send/i });

  await userEvent.type(textarea, "Persisted comment");
  await userEvent.click(button);

  const stored = JSON.parse(localStorage.getItem("comments-app"));

  expect(stored.comments.some((c) => c.content === "Persisted comment")).toBe(
    true,
  );
});

// edge cases

// empty input
test("does not add empty comment", async () => {
  render(<App />);

  const commentsBefore = screen.getAllByTestId(/comment-/i).length;

  const button = screen.getByRole("button", { name: /send/i });
  await userEvent.click(button);

  const commentsAfter = screen.getAllByTestId(/comment-/i).length;

  expect(commentsAfter).toBe(commentsBefore);
});

// delete modal cancel
test("cancel delete does not remove comment", async () => {
  render(<App />);

  const deleteBtn = screen.getAllByRole("button", { name: /delete/i })[0];
  await userEvent.click(deleteBtn);

  const cancelBtn = screen.getByRole("button", { name: /no, cancel/i });
  await userEvent.click(cancelBtn);

  expect(screen.getAllByText(/impressive/i).length).toBeGreaterThan(0);
});

// ui behavior

test("reply input toggles on click", async () => {
  render(<App />);

  const replyBtn = screen.getAllByText(/reply/i)[0];
  await userEvent.click(replyBtn);

  expect(screen.getAllByRole("textbox").length).toBeGreaterThan(1);
});

test("loads comments from localStorage", async () => {
  localStorage.setItem(
    "comments-app",
    JSON.stringify({
      currentUser: { username: "test", image: { png: "" } },
      comments: [
        {
          id: 1,
          content: "Stored",
          createdAt: Date.now(),
          score: 0,
          user: { username: "test", image: { png: "" } },
          replies: [],
        },
      ],
    }),
  );

  render(<App />);

  expect(screen.getByText("Stored")).toBeInTheDocument();
});

test("comments are ordered by score", () => {
  render(<App />);

  const comments = screen.getAllByTestId(/comment-/i);

  const scores = comments.map((comment) =>
    Number(within(comment).getByText(/\d+/).textContent),
  );

  const sorted = [...scores].sort((a, b) => b - a);

  expect(scores).toEqual(sorted);
});
