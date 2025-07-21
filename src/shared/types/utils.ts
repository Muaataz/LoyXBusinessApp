export interface UserDetailsResponse {
  user_id: string;
  user_first_name: string;
  user_registration_status: 'failed' | 'complete' | 'pending' | 'unknown';
  bankid_status: 'failed' | 'complete' | 'pending' | 'unknown';
  email_verified: boolean;
  mobile_number_verified: boolean;
  cookies_policy: {
    id?: string;
    version?: string | number;
    sections: any;
  };
}

export type TCommonData = {
  navigation: any;
  userData: any;
  bankid_api_env: string;
};
