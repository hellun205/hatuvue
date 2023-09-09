import { getIp, request } from "./server";
import storage from "./storage";

export interface User {
  id: number;
  ip: string;
  username: string;
}

interface GetUserRes {
  message: string;
  data: User;
}

interface ExistUserRes {
  message: string;
  data: boolean;
}

export const refreshUser = async () => {
  const ip = await getIp();
  const res = await request.get<ExistUserRes>(`user/exist?ip=${ip}`);
  if (res?.data.data) {
    setUser(ip);
  } else {
    await request.post("user/create", { ip });
    setUser(ip);
  }
};

const setUser = async (ip: string) => {
  const user = await request.get<GetUserRes>(`user?ip=${ip}`);
  storage.set("user", user?.data.data);
};
