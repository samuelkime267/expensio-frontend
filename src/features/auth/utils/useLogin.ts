import { useAuth } from "@/stores";
import { useNavigate } from "react-router-dom";
import { LoginSchema, type LoginSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services";
import { AppError } from "@/utils";

export default function useLogin(
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema) as unknown as Resolver<LoginSchemaType>,
  });

  const authMutation = useMutation({
    mutationFn: loginRequest, // swap for register when needed

    onSuccess: ({ token, user }) => {
      const {
        authProvider,
        email,
        _id: id,
        name,
        profilePicture,
        username,
      } = user;
      setToken(token.accessToken);

      setUser({ authProvider, email, id, name, profilePicture, username });

      navigate("/dashboard");
    },

    onError: (error) => {
      if (error instanceof AppError) {
        setError(error.message);
        return;
      }

      setError("Something went wrong");
    },
  });

  const submit = handleSubmit((bodyData: LoginSchemaType) => {
    setError(undefined);
    authMutation.mutate(bodyData);
  });

  return {
    formErrors: errors,
    register,
    submit,
    isLoading: authMutation.isPending,
  };
}
