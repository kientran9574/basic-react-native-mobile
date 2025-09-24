import { useMutation } from "@tanstack/react-query";
import authApi from "./api";

const useSignUpMutation = () => {
  return useMutation({
    mutationFn: authApi.signUp,
  });
};
const useSignInMutation = () => {
  return useMutation({
    mutationFn: authApi.signIn,
  });
};
const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: authApi.verify,
  });
};
const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: authApi.resendCode,
  });
};
export { useSignInMutation, useSignUpMutation, useVerifyCodeMutation,useResendCodeMutation };
