import { twMerge as twMergeOrig } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import store from "../store";
import { CITIES } from "../store/constants";

export const checkIsValid = (value: string) => {
  const lastMessage =
    store.getState().chat.messages[store.getState().chat.messages.length - 1]
      ?.text;

  if (!lastMessage) return true;

  const lastLetter =
    lastMessage[lastMessage.length - 1] === "ь" ||
    lastMessage[lastMessage.length - 1] === "ъ"
      ? lastMessage[lastMessage.length - 2]
      : lastMessage[lastMessage.length - 1];

  return lastLetter.toLowerCase() === value[0]?.toLowerCase();
};

export const checkIsIncludedInCityList = (value: string) =>
  !!store
    .getState()
    .cities.collection.find(
      (city) => city.toLowerCase() === value.toLowerCase()
    );

export const checkIsCityName = (value: string) =>
  !!CITIES.find((city) => city.toLowerCase() === value.trim().toLowerCase());

export const twMerge = (...args: ClassValue[]) => {
  return twMergeOrig(clsx(args));
};
