import { useEffect, useRef, useState } from 'react'

import { useAppSelector } from '../../store';
import { Message } from '..';

const Chat = () => {
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);

  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  const typingRef = useRef<null | HTMLDivElement>(null);

  const { messages, messagesCount } = useAppSelector(state => state.chat);
  const { isUserTurn } = useAppSelector(state => state.game);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [messages.length]);

  useEffect(() => {
    if (isOpponentTyping && typingRef.current) {
      typingRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [isOpponentTyping]);

  useEffect(() => {
    const timeOutId = !isUserTurn ? setTimeout(() => {
      setIsOpponentTyping(true);
    }, 1000) : null;

    return () => {
      timeOutId && clearTimeout(timeOutId);
      setIsOpponentTyping(false);
    }
  }, [isUserTurn]);
  
  return (
    <div className="w-full flex-1 justify-between flex flex-col p-4 overflow-y-auto gap-2 relative pb-0">
      <div className='flex flex-1 w-full flex-col'>
        {
          messages.map((message, index, array) => (
            <Message ref={index === array.length - 1 ? lastMessageRef : null} userMessage={message.userMessage} text={message.text} key={message.id} />
          ))
        }
      </div>
      {isOpponentTyping && (
        <div ref={typingRef} className='flex-1  flex items-end w-max'>
          <Message className="p-3 self-end" userMessage={false} text={(
            <div className="whitespace-nowrap border-r-4 flex justify-between w-max gap-1">
              <span className="w-3 h-3 rounded-[50%] block bg-primary animate-[typing_500ms_ease-in-out_infinite_0s_alternate]" />
              <span className="w-3 h-3 rounded-[50%] block bg-primary animate-[typing_500ms_ease-in-out_infinite_0.25s_alternate]" />
              <span className="w-3 h-3 rounded-[50%] block bg-primary animate-[typing_500ms_ease-in-out_infinite_0.5s_alternate]" />
            </div>
          )} />
        </div>
      )}
      {!!messagesCount && <p className='text-sm w-full flex items-end justify-center text-gray-400'>Всего перечислено городов: {messagesCount}</p>}
    </div>
  )
}

export default Chat