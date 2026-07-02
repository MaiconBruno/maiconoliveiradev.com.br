export type ContactFormPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  recaptcha_token: string;
  _honeypot?: string;
};

export type ContactFormSuccessResponse = {
  message: string;
};
