// src/components/ChatHistory.test.jsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { getChatsByUser } from "../firebaseFunctions";
import ChatHistory from "./ChatHistory";

jest.mock("../firebaseFunctions");

const mockChats = [
  { id: "1", title: "Chat 1", createdAt: "2023-10-01" },
  { id: "2", title: "Chat 2", createdAt: "2023-10-02" },
  { id: "3", title: "Chat 3", createdAt: "2023-10-03" },
];

describe("ChatHistory Component", () => {
  beforeEach(() => {
    getChatsByUser.mockResolvedValue(mockChats);
  });

  test("displays loading indicator while fetching chats", () => {
    render(<ChatHistory setChatId={jest.fn()} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays chat history after loading", async () => {
    render(<ChatHistory setChatId={jest.fn()} />);
    expect(await screen.findByText("Chat 1")).toBeInTheDocument();
    expect(await screen.findByText("Chat 2")).toBeInTheDocument();
  });

  test("calls setChatId when a chat link is clicked", async () => {
    const setChatIdMock = jest.fn();
    render(<ChatHistory setChatId={setChatIdMock} />);
    await screen.findByText("Chat 1");
    fireEvent.click(screen.getByText("Chat 1"));
    expect(setChatIdMock).toHaveBeenCalledWith("1");
  });

  test("handles empty chat history", async () => {
    getChatsByUser.mockResolvedValueOnce([]);
    render(<ChatHistory setChatId={jest.fn()} />);
    await waitFor(() => {
      expect(
        screen.getByText(/no chat history available/i)
      ).toBeInTheDocument();
    });
  });
});
