import { lazy, object, ref, string } from 'yup';

import { FieldsErrors } from '../types/errors';

import { Regexp } from './regexp';

export const authScheme = object({
    identifier: string().required(FieldsErrors.required),
    password: string().required(FieldsErrors.required)
})

export const usernameSchema = object({
    username: string().required(FieldsErrors.required)
        .matches(Regexp.latinLetters, FieldsErrors.latinLetters)
        .matches(Regexp.numbers, FieldsErrors.numbers)
})

export const passwordSchema = object({
    password: string().required(FieldsErrors.required)
        .matches(Regexp.minEightCharacters, FieldsErrors.minEightCharacters)
        .matches(Regexp.upperLetter, FieldsErrors.upperLetter)
        .matches(Regexp.number, FieldsErrors.number)
})


export const registrationStepOneSchema = object({
    username: string().required(FieldsErrors.required)
        .matches(Regexp.latinLetters, FieldsErrors.latinLetters)
        .matches(Regexp.numbers, FieldsErrors.numbers),
    password: string().required(FieldsErrors.required)
        .matches(Regexp.minEightCharacters, FieldsErrors.minEightCharacters)
        .matches(Regexp.upperLetter, FieldsErrors.upperLetter)
        .matches(Regexp.number, FieldsErrors.number)
})

export const registrationStepTwoSchema = object({
    firstName: string().required(FieldsErrors.required),
    lastName: string().required(FieldsErrors.required)
})

export const registrationStepThreeSchema = object({
    phone: string().required(FieldsErrors.required)
        .matches(Regexp.phone, FieldsErrors.phone),
    email: string().required(FieldsErrors.required)
        .matches(Regexp.email, FieldsErrors.email)
})

export const forgotPasswordSchema = object({
    email: string().required(FieldsErrors.required)
        .matches(Regexp.email, FieldsErrors.email)
})

export const resetPasswordSchema = object({
    password: string().required(FieldsErrors.required)
        .matches(Regexp.minEightCharacters, FieldsErrors.minEightCharacters)
        .matches(Regexp.upperLetter, FieldsErrors.upperLetter)
        .matches(Regexp.number, FieldsErrors.number),
    passwordConfirmation: lazy(value =>
        string().when('passwordConfirmation', (_, schema) =>
            value === ''
                ? schema.required(FieldsErrors.required)
                : schema.oneOf([ref('password')], FieldsErrors.password)
        )
    )
})
