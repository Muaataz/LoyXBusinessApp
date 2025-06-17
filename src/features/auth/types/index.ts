export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SendBankIdRequestResponse {
  order_ref: string;
  auto_start_token: string;
}

export interface SendCodeVerifyResponse {
  user_id: string;
  type: string;
}

export interface VerifyCodeRequestResponse {
  user_id: string;
  type: string;
  verified: boolean;
}

export type LoyXPopupType = {
  isVisible: boolean;
  onClose: () => void;
};
