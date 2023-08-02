import { UserInfo } from './auth';

export type ProfileResponse = {
  profile: Pick<UserInfo, 'bio' | 'image' | 'username'> & {
    following: boolean;
  };
};

export async function fetchProfile(username: string) {}
