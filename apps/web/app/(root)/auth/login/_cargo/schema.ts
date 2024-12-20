import * as yup from "yup"

// yup schema
export const singInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

