import * as yup from "yup";
import { singInSchema } from "@/app/(root)/auth/login/_cargo/schema";

export type SignInFormValues = yup.InferType<typeof singInSchema>
