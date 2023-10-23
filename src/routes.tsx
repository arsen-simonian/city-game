import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import { Game, GameEnd, WelcomePage } from "./pages";

export enum Routes {
  Home = '/',
  Game = '/game',
  GameEnd = '/game-end',
}

export const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      },
      {
        path: Routes.Game,
        element: <Game />
      },
      {
        path: Routes.GameEnd,
        element: <GameEnd />
      }
    ]
  },
]);