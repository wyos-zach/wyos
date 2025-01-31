import { env } from 'process';

export const validateRequest = async (req: Request) => {
  const headers = Object.fromEntries(req.headers.entries());
  return (
    headers['x-appwrite-webhook-secret'] === process.env.APPWRITE_WEBHOOK_SECRET
  );
};
