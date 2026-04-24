import { useState, useEffect } from "react";
import { initialData } from "./data/data";
import CommentList from "./components/CommentList";
import CommentInput from "./components/CommentInput";

function App() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("comments-app");
      return stored ? JSON.parse(stored) : initialData;
    } catch (err) {
      console.error("Failed to parse localStorage", err);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("comments-app", JSON.stringify(data));
    } catch (err) {
      console.error("Storage failed", err);
    }
  }, [data]);

  const addComment = (text) => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(), // simple unique ID
      content: text,
      createdAt: "just now",
      score: 0,
      user: data.currentUser,
      replies: [],
    };

    setData((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
  };

  const addReply = (parentId, text, replyingTo) => {
    if (!text.trim()) return;

    const newReply = {
      id: Date.now(),
      content: text,
      createdAt: "just now",
      score: 0,
      replyingTo,
      user: data.currentUser,
      replies: [],
    };

    const updateTree = (comments) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }

        return {
          ...comment,
          replies: updateTree(comment.replies || []),
        };
      });
    };

    setData((prev) => ({
      ...prev,
      comments: updateTree(prev.comments),
    }));
  };

  const updateScore = (id, delta) => {
    const updateTree = (comments) => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            score: comment.score + delta,
          };
        }

        return {
          ...comment,
          replies: updateTree(comment.replies || []),
        };
      });
    };

    setData((prev) => ({
      ...prev,
      comments: updateTree(prev.comments),
    }));
  };

  const updateComment = (id, newContent) => {
    if (!newContent.trim()) return;

    const updateTree = (comments) => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            content: newContent,
          };
        }

        return {
          ...comment,
          replies: updateTree(comment.replies || []),
        };
      });
    };

    setData((prev) => ({
      ...prev,
      comments: updateTree(prev.comments),
    }));
  };

  const deleteComment = (id) => {
    const deleteFromTree = (comments) => {
      return comments
        .filter((comment) => comment.id !== id) // remove match
        .map((comment) => ({
          ...comment,
          replies: deleteFromTree(comment.replies || []),
        }));
    };

    setData((prev) => ({
      ...prev,
      comments: deleteFromTree(prev.comments),
    }));
  };

  return (
    <main>
      <CommentList
        comments={data.comments}
        currentUser={data.currentUser}
        addReply={addReply}
        updateScore={updateScore}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />

      <CommentInput
        currentUser={data.currentUser}
        onSubmit={addComment}
      />
    </main>
  );
}

export default App;
