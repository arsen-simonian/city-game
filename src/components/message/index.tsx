import { forwardRef } from 'react'
import { twMerge } from '../../helpers';

export type MessageProps = {
  text: React.ReactNode;
  userMessage: boolean;
  className?: string;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(({ text, userMessage, className = '' }, ref) => {
  return (
    <div className={twMerge(`
    flex  
    w-max 
    py-2 px-6 
    rounded-xl
    ${userMessage ? 'self-end' : 'self-start'}
    ${userMessage ? 'text-white' : 'text-gray-700'} 
    ${userMessage ? 'bg-primary' : 'bg-violet-100'} 
    ${userMessage ? 'rounded-br-none' : 'rounded-bl-none'}`,
      className)
    } 
      ref={ref}
    >
      {text}
    </div>
  )
})

export default Message