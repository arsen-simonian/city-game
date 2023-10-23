import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { restart } from "./game";

export type Message = {
  text: string;
  userMessage: boolean;
  id: string
}

export type Chat = {
  messagesCount: number;
  messages: Array<Message>
}

export type SendMessagePayload = {
  userMessage: boolean;
  text: string
}

const initialState: Chat = {
  messages: [],
  messagesCount: 0,
}

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: {
      prepare: (payload: SendMessagePayload) => {
        return { payload: { ...payload, id: nanoid() } }
      },
      reducer: (state, action: PayloadAction<SendMessagePayload & { id: string }>) => {
        state.messagesCount++;
        state.messages.push(action.payload)
      }
    },
  },
  extraReducers: {
    [restart.type]: (state) => {
      state.messagesCount = 0;
      state.messages = [];
    }
  }
})

export const { actions: { sendMessage }, reducer: chatReducer } = chat;