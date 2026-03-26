import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser, logoutUser, fetchCurrentUser } from "../api/authApi";
import type { LoginPayload, RegisterPayload, User, AuthResponse } from "../types/auth";

export const useAuth = () => {
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        error,
        isError,
    } = useQuery<User | null>({
        queryKey: ["auth"],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: Infinity, // User profile doesn't change often
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data: AuthResponse) => {
            const authToken = data.token || data.user.token;
            if (authToken) {
                localStorage.setItem("token", authToken);
            }
            queryClient.setQueryData(["auth"], data.user);
        },
    });

    const signupMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data: AuthResponse) => {
            const authToken = data.token || data.user.token;
            if (authToken) {
                localStorage.setItem("token", authToken);
            }
            queryClient.setQueryData(["auth"], data.user);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await logoutUser();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        onSuccess: () => {
            queryClient.setQueryData(["auth"], null);
            queryClient.clear();
        },
    });

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        login: loginMutation.mutateAsync,
        signup: signupMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        isSigningUp: signupMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        authError: error,
    };
};
