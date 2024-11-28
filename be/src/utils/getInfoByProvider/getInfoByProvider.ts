import { ProviderUser } from "@utils/types";
import { Profile } from "passport";

export const getInfoByProvider = async (provider: Profile | Express.User) => {
  // Cast `provider` to `ProviderUser`
  const providerUser = provider as ProviderUser;

  // Ensure email is available
  const email = providerUser.emails?.[0]?.value || undefined;

  // Google OAuth Strategy
  if (providerUser.provider === 'google') {
    return {
      email,
      provider: providerUser.provider, // Google provider
      sub: providerUser.id, // Google user ID
      photo: providerUser.photos ? providerUser.photos[0].value : undefined,
      phone: providerUser.phone || undefined,
      phone_country_code: providerUser.phoneCountryCode || undefined,
      first_name: providerUser.name.givenName || undefined,
      last_name: providerUser.name.familyName || undefined,
      username: providerUser.username || providerUser.name.givenName,
    };
  }

  // Facebook OAuth Strategy
  if (providerUser.provider === 'facebook') {
    return {
      email,
      provider: providerUser.provider, // Facebook provider
      sub: providerUser.id, // Facebook user ID
      photo: providerUser.photos ? providerUser.photos[0].value : undefined,
      phone: providerUser.phone || undefined,
      phone_country_code: providerUser.phoneCountryCode || undefined,
      first_name: providerUser.first_name || undefined,
      last_name: providerUser.last_name || undefined,
      username: providerUser.username || providerUser.first_name,
    };
  }

  // Microsoft OAuth Strategy
  if (providerUser.provider === 'microsoft') {
    return {
      email,
      provider: providerUser.provider, // Microsoft provider
      sub: providerUser.id, // Microsoft user ID
      photo: providerUser.photos ? providerUser.photos[0].value : undefined,
      phone: providerUser.phone || undefined,
      phone_country_code: providerUser.phoneCountryCode || undefined,
      first_name: providerUser.name.givenName || undefined,
      last_name: providerUser.name.familyName || undefined,
      username: providerUser.username || providerUser.name.givenName,
    };
  }

  // If no provider matches
  return {
    email: undefined,
    provider: undefined,
    sub: undefined,
    photo: undefined,
    phone: undefined,
    phone_country_code: undefined,
    first_name: undefined,
    last_name: undefined,
    username: undefined,
  };
}