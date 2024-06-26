export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true,
      });

      if (result.error) {
        const error = result.error.details
          .map((detail) => detail.message)
          .join(", ");
        return res.error("Validation Error", error, 400);
      }
      if(result.value.phone){
        req.body.phone = result.value.phone;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
