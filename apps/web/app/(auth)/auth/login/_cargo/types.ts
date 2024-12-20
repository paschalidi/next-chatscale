import * as yup from "yup";
import { singInSchema } from "@/app/(auth)/auth/login/_cargo/schema";

export type SignInFormValues = yup.InferType<typeof singInSchema>
