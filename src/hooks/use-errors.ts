import { useEffect, useState } from 'react';
import { ObjectSchema } from 'yup';

export const useErrors = (
    schema: ObjectSchema<any>,
    type: 'password' | 'username',
    text: string
) => {
    const [errorsArray, setErrorsArray] = useState<string[]>([]);

    useEffect(() => {
        if (type === 'username') {
            const validate = async (username: string) => {
                try {
                    const result = await schema.validate({username}, {abortEarly: false});

                    if (result) {
                        setErrorsArray([])
                    }
                }
                catch (error: any) {
                    setErrorsArray(error.errors)
                }
            }

            validate(text)
        }
        if (type === 'password') {
            const validate = async (password: string) => {
                try {
                    const result = await schema.validate({password}, {abortEarly: false});

                    if (result) {
                        setErrorsArray([])
                    }
                }
                catch (error: any) {
                    setErrorsArray(error.errors)
                }
            }

            validate(text)
        }
    }, [schema, type, text])

    return { errorsArray }
}
