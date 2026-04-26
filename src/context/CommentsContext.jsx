import { createContext, useContext } from "react";

export const CommentsContext = createContext();

export const useComments = () => useContext(CommentsContext);
