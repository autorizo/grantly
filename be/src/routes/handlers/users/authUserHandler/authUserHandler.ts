import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { createUserByOauth, getUserByEmail } from '@controllers/user';
import { generateToken, getInfoByProvider, getSignedUrl } from '@utils/index';
import { Session } from '@utils/types';

// Implement the handler
export const authUserHandler = async (req: Request, res: Response) => {
  const { user: profileUser } = req;

  // Make sure `profileUser` is typed as `Profile`
  if (!profileUser) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Profile not found'])
    );
  }

  // Use `getInfoByProvider` to extract user info
  const {
    photo,
    phone,
    phone_country_code,
    first_name,
    last_name,
    username,
    email,
    sub,
    provider,
  } = await getInfoByProvider(profileUser);

  if (!email) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Email not found'])
    );
  }

  // Use extracted `userName` or fall back to `first_name`
  const userName = username ?? first_name ?? 'Autorizo';

  let user = await getUserByEmail(email);

  try {
    if (!user) {
      // Create new user by OAuth info
      user = await createUserByOauth(
        email,
        userName,
        sub,
        provider,
        photo,
        phone,
        phone_country_code,
        first_name,
        last_name
      );
    }

    const signedPhoto = user.photo && (await getSignedUrl(user.photo));

    const session: Session = {
      id: user.id,
      email: user.email,
      userName: user.username,
      photo: signedPhoto,
    };

    const jwt = generateToken(session);

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    const redirectUrl = `${process.env.USER_INTERFACE_URL}/?jwt=${jwt}`;

    res.redirect(redirectUrl);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
