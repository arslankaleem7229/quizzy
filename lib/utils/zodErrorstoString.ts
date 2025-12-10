import { ZodError } from "zod";

export default function zodErrorsToString(error: ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
}
