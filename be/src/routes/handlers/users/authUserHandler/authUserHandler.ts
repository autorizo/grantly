import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { Profile } from 'passport';
import { createUserByOauth, getUserByEmail } from '@controllers/user';
import { generateToken } from '@utils/index';
import { Session } from '@utils/types';

// Implement the handler
export const authUserHandler = async (req: Request, res: Response) => {
  console.log('req.user', req.user);
  const { emails, id, name, username, photos, provider } = req.user as Profile;
  const [email] = emails || [];
  const [photo] = photos || [];

  if (!email) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Email not found'])
    );
  }
  let user = await getUserByEmail(email.value);

  try {
    if (!user) {
      // Create user if not found
      const userName =
        `${name?.givenName} ${name?.familyName}` || username || '';

      user = await createUserByOauth(
        email.value,
        userName,
        id,
        photo?.value,
        provider
      );
    }

    const session: Session = {
      id: user.id,
      email: user.email,
      name: user.name,
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
