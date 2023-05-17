import {
    registrationStepOneSchema,
    registrationStepThreeSchema,
    registrationStepTwoSchema
} from '../form-validation/schema';

export const selectRegistrationSchema = (registrationStep: number) => {
    switch (registrationStep) {
        case 1:
            return registrationStepOneSchema
        case 2:
            return registrationStepTwoSchema
        case 3:
            return registrationStepThreeSchema
        default:
            return registrationStepOneSchema
    }
}
