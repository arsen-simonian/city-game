import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '..'
import { useAppDispatch, useAppSelector } from '../../store';
import validatorScheme from './validation';
import { sendMessage } from '../../store/slices/chat';
import { Send } from 'lucide-react';

export type MessageForm = {
  message: string
}

const MessageInput = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: yupResolver(validatorScheme),
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  });

  const dispatch = useAppDispatch();

  const { isUserTurn } = useAppSelector(state => state.game);

  const onSend = (values: MessageForm) => {
    reset();

    dispatch(sendMessage({ text: values.message, userMessage: true }))
  }


  return (
    <div className="p-4 flex w-full justify-between items-center">
      <form className="w-full">
        <Input
          id="messageBox"
          disabled={!isUserTurn}
          endButton={
            <Button type="submit" disabled={!isUserTurn} onClick={handleSubmit(onSend)}>
              <Send />
            </Button>
          }
          {...register('message')}
        />
        {errors.message?.message && <label className="text-error text-xs" htmlFor="messageBox">{errors.message?.message}</label>}
      </form>

    </div>
  )
}

export default MessageInput