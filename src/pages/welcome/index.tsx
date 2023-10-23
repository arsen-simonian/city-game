import { useNavigate } from 'react-router-dom'

import { Button } from '../../components'
import { Routes } from '../../routes';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-full flex items-center justify-center flex-col'>
      <div className='border-b-2 flex w-full p-4 items-center justify-center'>
        <h4 className='font-normal text-lg'>Игра в города на время</h4>
      </div>
      <div className='w-full gap-6 flex flex-1 flex-col p-6'>
        <h5>Цель: Назвать как можно больше реальных городов.</h5>

        <ul className='list-disc p-6'>
          <li>Запрещается повторение городов.</li>
          <li>Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.</li>
          <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим</li>
        </ul>
        <div className='flex justify-center'>
          <Button onClick={() => navigate(Routes.Game)}>
            Начать игру
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome