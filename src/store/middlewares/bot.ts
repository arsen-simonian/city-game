import { Dispatch, Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { sendMessage } from "../slices/chat";
import { GameResult, GameState, endGame, setTurn } from "../slices/game";

const botMiddleware: Middleware<Dispatch, RootState> =
  (store) => (next) => (action) => {
    next(action);

    if (setTurn.match(action)) {
      if (!action.payload) {
        const lastMessage =
          store.getState().chat.messages[
            store.getState().chat.messages.length - 1
          ]?.text;

        const play = () => {
          if (
            !lastMessage &&
            store.getState().game.gameState !== GameState.Ended
          ) {
            store.dispatch(
              sendMessage({
                text: store.getState().cities.collection[
                  Math.floor(
                    Math.random() * store.getState().cities.collection.length -
                      1
                  )
                ],
                userMessage: false,
              })
            );

            return;
          }

          const lastLetter =
            lastMessage[lastMessage.length - 1] === "ь" ||
            lastMessage[lastMessage.length - 1] === "ъ"
              ? lastMessage[lastMessage.length - 2]
              : lastMessage[lastMessage.length - 1];

          const cityName = store
            .getState()
            .cities.collection.find(
              (city) => city[0].toLowerCase() === lastLetter.toLowerCase()
            );

          if (cityName && store.getState().game.gameState !== GameState.Ended) {
            store.dispatch(sendMessage({ text: cityName, userMessage: false }));
          } else {
            store.dispatch(endGame(GameResult.Win));
            return;
          }
        };
        setTimeout(() => {
          play();
        }, 4000 + Math.random() * 2000);
      }
    }
  };

export default botMiddleware;
