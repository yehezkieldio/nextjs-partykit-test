import { customAlphabet } from "nanoid";
import { uuidv7 } from "uuidv7";

const alphabet = "0123456789";
const length = 14;

const nanoid = customAlphabet(alphabet, length);

export function generatePublicId(): string {
  return nanoid();
}

export function generateUuid(): string {
  return uuidv7();
}
