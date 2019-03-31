import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const user = await prisma.createuser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};
