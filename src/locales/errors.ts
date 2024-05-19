import { string } from "yup";

let translateMap: { [index: string]: string } = {
  "Errors.Common.NotAuthenticated": "Ошибка аутентификации",
  "Errors.Employee.InvalidPassword": "Неверный логин или пароль",
};

export function humanizeError(err: string): string {
  let arr = err.split("\n");

  let translated: string[] = [];

  arr.forEach((e, i) => {
    if (translateMap[e]) {
      translated.push(translateMap[e]);
    } else {
      translated.push(e);
    }
  });

  return translated.join("\n");
}
