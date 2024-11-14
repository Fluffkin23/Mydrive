import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appWriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

// session client
export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appWriteConfig.endpointUrl)
    .setProject(appWriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value)
    throw new Error("Could not get current session");
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
};

// using on the server like creating database, manage users etc. much more powerful
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appWriteConfig.endpointUrl)
    .setProject(appWriteConfig.projectId)
    .setKey(appWriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatar() {
      return new Avatars(client);
    },
  };
};
