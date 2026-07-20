import { AxiosError, type AxiosResponse } from "axios";
import { z } from "zod";
import { AppError } from "../class/AppError";
import { ApiErrorSchema } from "@/schemas/error.schema";
import { createSuccessSchema } from "@/utils";

// Overloads
export function apiHandler<TDataSchema extends z.ZodTypeAny>(
  dataSchema: TDataSchema,
  request: () => Promise<AxiosResponse<unknown>>,
): Promise<z.infer<TDataSchema>>;

export function apiHandler(
  request: () => Promise<AxiosResponse<unknown>>,
): Promise<void>;

// Implementation
export async function apiHandler<TDataSchema extends z.ZodTypeAny>(
  schemaOrRequest: TDataSchema | (() => Promise<AxiosResponse<unknown>>),
  maybeRequest?: () => Promise<AxiosResponse<unknown>>,
): Promise<z.infer<TDataSchema> | void> {
  const hasSchema = typeof schemaOrRequest !== "function";

  const request = hasSchema
    ? maybeRequest!
    : (schemaOrRequest as () => Promise<AxiosResponse<unknown>>);

  try {
    const response = await request();

    if (hasSchema) {
      const responseSchema = z.discriminatedUnion("success", [
        createSuccessSchema(schemaOrRequest),
        ApiErrorSchema,
      ]);

      const result = responseSchema.safeParse(response.data);

      if (!result.success) {
        console.error(result.error);
        throw new AppError("Invalid server response", "validation");
      }

      const parsed = result.data as unknown as z.infer<typeof responseSchema>;

      if (!parsed.success) {
        console.error(parsed.message);
        throw new AppError(parsed.message, "api");
      }

      // literally the solution I could think of as of now
      const finalData = parsed as unknown as { data: z.infer<TDataSchema> };

      return finalData.data;
    }

    const responseSchema = z.discriminatedUnion("success", [
      createSuccessSchema(),
      ApiErrorSchema,
    ]);

    const result = responseSchema.safeParse(response.data);

    if (!result.success) {
      console.error(result.error);
      throw new AppError("Invalid server response", "validation");
    }

    const parsed = result.data;

    if (!parsed.success) {
      console.error(parsed.message);
      throw new AppError(parsed.message, "api");
    }

    return;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const parsedError = ApiErrorSchema.safeParse(error.response?.data);

      if (parsedError.success) {
        console.error(parsedError.data);

        throw new AppError(
          parsedError.data.message,
          "api",
          error.response?.status,
        );
      }

      console.error(error);

      throw new AppError(
        "Network request failed",
        "network",
        error.response?.status,
      );
    }

    if (error instanceof AppError) {
      throw error;
    }

    console.error(error);

    throw new AppError("Something went wrong", "unknown");
  }
}
