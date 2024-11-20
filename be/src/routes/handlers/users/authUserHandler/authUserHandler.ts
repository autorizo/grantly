import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { Profile } from 'passport';
import { createUserByOauth, getUserByEmail } from '@controllers/user';
import { generateToken } from '@utils/index';
import { Session } from '@utils/types';

// Implement the handler
export const authUserHandler = async (req: Request, res: Response) => {
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

      console.log('userName', userName);

      user = await createUserByOauth(
        email.value,
        userName,
        id,
        photo?.value,
        provider
      );
      console.log('user', user);
    }

    const session: Session = {
      id: user.id,
      email: user.email,
    };
    console.log('session', session);
    const jwt = generateToken(session);

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.redirect('http://localhost:3000?jwt=' + jwt);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
