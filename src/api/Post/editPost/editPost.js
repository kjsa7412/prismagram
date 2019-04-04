import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      // 인증
      isAuthenticated(request);
      // 인자
      const { id, caption, location, action } = args;
      // 요청자
      const { user } = request;
      // post가 요청자가 생성한 것 인지 확인
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        // 이 post는 요청자 니가 생성한게 아니니까 넌 수정 할 수 없어
        throw Error("You can't do that");
      }
    }
  }
};
