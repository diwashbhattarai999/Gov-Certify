import ErrorCard from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return (
    <ErrorCard backButtonHref="/login" backButtonLabel="Go back to Login" />
  );
};

export default AuthErrorPage;
