type Session = {
  id: string;
  email: string;
  sub?: string;
  userName: string;
  photo?: string;
};

// Define the types for each OAuth provider user
interface GoogleUser {
  provider: 'google';
  photos?: { value: string }[];
  phone?: string | null;
  phoneCountryCode?: string | null;
  name: { givenName: string; familyName: string };
  emails?: { value: string }[];
  username?: string;
  id: string;
}

interface FacebookUser {
  provider: 'facebook';
  photos?: { value: string }[];
  phone?: string | null;
  phoneCountryCode?: string | null;
  first_name: string;
  last_name: string;
  username?: string;
  emails?: { value: string }[];
  id: string;
}

interface MicrosoftUser {
  provider: 'microsoft';
  photos?: { value: string }[];
  mobilePhone?: string | null;
  phoneCountryCode?: string | null;
  name: { givenName: string; familyName: string };
  emails?: { value: string }[];
  displayName?: string;
  id: string;
}

type ProviderUser = GoogleUser | FacebookUser | MicrosoftUser;


export type { Session, ProviderUser };
