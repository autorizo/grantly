import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import {
  createUserByOauth,
  getUserByEmail,
  updateUserAvatarUrl,
} from '@controllers/user';
import {
  generateToken,
  getInfoByProvider,
  getSignedUrl,
  uploadImageToStorage,
} from '@utils/index';
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
  const userName = username;

  let user = await getUserByEmail(email);
  let signedPhoto = undefined;

  try {
    if (!user) {
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
      if (photo) {
        const response = await fetch(photo);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const { fileName } = await uploadImageToStorage(user.id, buffer);

        await updateUserAvatarUrl(user.id, fileName);
        signedPhoto = user.photo && (await getSignedUrl(fileName));
      }
    }

    signedPhoto = user.photo && (await getSignedUrl(user.photo));

    const session: Session = {
      id: user.id,
      email: user.email,
      userName: user.first_name ?? user.username ?? user.email,
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
