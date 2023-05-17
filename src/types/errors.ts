export enum AuthErrors {
    wrongInfo = 'Неверный логин или пароль!',
    smthWrong = 'Что-то пошло не так. Попробуйте еще раз'
}

export enum RegistrationErrors {
    notUniqueInfo = 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
    smthWrong = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
}

export enum RecoveryErrors {
    smthWrong = 'Что-то пошло не так. Попробуйте еще раз'
}

export enum FieldsErrors {
    required = 'Поле не может быть пустым',
    latinLetters = 'латинский алфавит',
    numbers = 'цифры',
    minEightCharacters = 'не менее 8 символов',
    upperLetter = 'с заглавной буквой',
    number = 'цифрой',
    phone = 'В формате +375 (xx) xxx-xx-xx',
    email = 'Введите корректный e-mail',
    password = 'Пароли не совпадают'
}
