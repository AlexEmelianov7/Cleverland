export const Regexp = {
    latinLetters: /(?=.*[a-zA-Z]).+/,
    numbers: /(?=.*\d).+/,
    minEightCharacters: /[0-9a-zA-Z]{8,}/,
    upperLetter: /(?=.*[A-Z])/,
    number: /(?=.*[0-9])/,
    phone:  /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
}
