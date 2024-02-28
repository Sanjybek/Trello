import { createBrowserRouter } from "react-router-dom";
import TrelloPage from "./trelloPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <TrelloPage/>
      </>
    )
  }

])