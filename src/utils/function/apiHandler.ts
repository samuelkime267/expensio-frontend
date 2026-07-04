import { AxiosError, type AxiosResponse } from "axios";
import { z } from "zod";
import { AppError } from "../class/AppError";
import { ApiErrorSchema } from "@/schemas/error.schema";
import { createSuccessSchema } from "@/utils";

export const apiHandler = async <TDataSchema extends z.ZodTypeAny>(
  dataSchema: TDataSchema,
  request: () => Promise<AxiosResponse<unknown>>,
): Promise<z.infer<TDataSchema>> => {
  const responseSchema = z.discriminatedUnion("success", [
    createSuccessSchema(dataSchema),
    ApiErrorSchema,
  ]);

  try {
    const response = await request();
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

    type SuccessResponse<T> = {
      success: true;
      message: string;
      data: T;
    };

    return (parsed as SuccessResponse<z.infer<TDataSchema>>).data;
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
};
