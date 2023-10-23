import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Chat, MessageInput } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  GameResult,
  GameState,
  endGame,
  setTurn,
} from "../../store/slices/game";
import { useTimer } from "../../hooks/use-timer";
import { Routes } from "../../routes";

const ROUND_DURATION = 6; // round duration in seconds

const Game = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isUserTurn, gameState } = useAppSelector((state) => state.game);

  const {
    time,
    start: startTimer,
    reset: resetTimer,
    timePassedInPercent,
  } = useTimer({
    seconds: ROUND_DURATION,
    onFinish: () => onTimeFinish(),
  });

  const onTimeFinish = () => {
    dispatch(endGame(isUserTurn ? GameResult.Loose : GameResult.Win));
  };

  useEffect(() => {
    dispatch(setTurn(Math.random() > 0.5));
  }, [dispatch]);

  useEffect(() => {
    if (gameState === GameState.Ended) {
      navigate(Routes.GameEnd);
    }
  }, [gameState, navigate]);

  useEffect(() => {
    resetTimer();
    startTimer();
  }, [isUserTurn, resetTimer, startTimer]);

  return (
    <div className="w-full flex flex-col items-center justify-between h-screen xs:h-app-max">
      <div className="w-full flex items-center p-6 justify-between">
        <h4>
          {isUserTurn ? "Сейчас ваша очередь" : "Сейчас очередь соперника"}
        </h4>
        <h3 className="font-medium">{time}</h3>
      </div>
      <div className="w-full bg-slate-100">
        <hr
          style={{ width: `${timePassedInPercent}%` }}
          className={`self-start h-2 bg-primary transition-[width] duration-${
            timePassedInPercent === 100 ? 0 : 1000
          }`}
        />
      </div>
      <Chat />
      <MessageInput />
    </div>
  );
};

export default Game;
