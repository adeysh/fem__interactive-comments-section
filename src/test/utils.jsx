import { render } from "@testing-library/react";
import { CommentsContext } from "../context/CommentsContext";

export function renderWithContext(ui, value) {
  return render(
    <CommentsContext.Provider value={value}>{ui}</CommentsContext.Provider>,
  );
}
