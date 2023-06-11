import EncryptedStorage from 'react-native-encrypted-storage';
import z from 'zod';

const TOKEN_LIFETIME_MS = 3600000 * 24;
const TOKEN_KEY = 'access_token';

const tokenSchema = z.object({
  token: z.string(),
  createdAt: z.string().datetime(),
});
type TokenData = z.infer<typeof tokenSchema>;

export const setTokenToStorage = async (token: string) => {
  try {
    const tokenObject: TokenData = {
      token,
      createdAt: new Date().toISOString(),
    };
    await EncryptedStorage.setItem(TOKEN_KEY, JSON.stringify(tokenObject));
  } catch (error) {
    console.error('Failed to set token: ', error);
  }
};

export const getToken = async () => {
  try {
    const token = await EncryptedStorage.getItem(TOKEN_KEY);
    if (!token) return;

    const parsedData = tokenSchema.safeParse(JSON.parse(token));
    if (!parsedData.success) return;

    const tokenCreationTime = new Date(parsedData.data.createdAt).getTime();
    const currentTime = new Date().getTime();

    if (currentTime - tokenCreationTime > TOKEN_LIFETIME_MS) {
      await removeToken();
      return;
    }

    return parsedData.data.token;
  } catch (error) {
    console.error('Failed to get token: ', error);
  }
};

export const removeToken = async () => {
  try {
    await EncryptedStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove token: ', error);
  }
};
