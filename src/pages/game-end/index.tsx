import { useNavigate } from "react-router-dom";

import { Button } from "../../components";
import { Routes } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store";
import { TEXTS } from "./constants";
import { GameResult, restart } from "../../store/slices/game";

const GameEnd = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { result } = useAppSelector((state) => state.game);
  const { messages, messagesCount } = useAppSelector((state) => state.chat);

  const playAgain = () => {
    navigate(Routes.Game);
    dispatch(restart());
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="border-b-2 flex w-full p-4 items-center justify-center">
        <h4 className="font-normal text-lg">{TEXTS[result].title}</h4>
      </div>
      <div className="w-full gap-12 flex flex-1 flex-col p-6">
        <h2
          className={`${
            result === GameResult.Win ? "text-success" : "text-error"
          } 
            text-3xl 
            text-center`}
        >
          00:00
        </h2>
        <p className="text-center">
          Всего было перечислено городов: {messagesCount} <br /> Очень не плохой
          результат!{" "}
        </p>
        <p className="text-center">Последний город названный победителем</p>

        <h4 className="font-normal text-2xl text-slate-900 text-center">
          {messages[messagesCount - 1]?.text}
        </h4>
        <div className="flex justify-center">
          <Button onClick={playAgain}>Начать новую игру</Button>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
