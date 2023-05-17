export const getRegisterBtnName = (registrationStep: number) => {
    switch (registrationStep) {
        case 1:
            return 'Следующий шаг'
        case 2:
            return 'Последний шаг'
        case 3:
            return 'Зарегистрироваться'
        default:
            return 'Следующий шаг'
    }
}
