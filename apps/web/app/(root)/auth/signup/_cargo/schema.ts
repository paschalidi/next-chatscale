import * as yup from "yup"

// yup schema
export const createOrgSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  organization_name: yup.string().required(),
})

