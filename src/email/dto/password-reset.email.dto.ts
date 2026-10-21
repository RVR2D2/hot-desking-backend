export type PasswordResetEmailDto = {
  email: string;
  name: string;
  code: string;
  expiresAt: Date;
};
