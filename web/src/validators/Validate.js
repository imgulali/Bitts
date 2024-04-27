export const validate = async (schema, data) => {
    try {
        if(!schema || !data){
            return { validationError: "Schema or Data is missing" };
        }
        await schema.validate(data, { abortEarly: false });
        return { validationError: null };
    } catch (error) {
        const validationError = error.inner[0].message;
        return { validationError };
    }
};