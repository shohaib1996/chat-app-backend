import { Router } from "express";
import UserRoutes from "../modules/users/user.routes";
import MessageRoutes from "../modules/messages/message.routes";
import GroupRoutes from "../modules/groups/group.routes";
import GroupMemberRoutes from "../modules/groupmembers/groupmember.routes";

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/messages',
    route: MessageRoutes,
  },
  {
    path: '/groups',
    route: GroupRoutes,
  },
  {
    path: '/groupmembers',
    route: GroupMemberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
