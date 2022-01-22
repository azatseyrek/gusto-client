import { Permission } from "./../entity/permision.entity";

import { Role } from "../entity/role.entity";
import { createConnection, getManager } from "typeorm";

createConnection().then(async connection => {
  const permissionRepository = getManager().getRepository(Permission);

  const perms = [
    "view_users",
    "edit_user",
    "view_roles",
    "edit_roles",
    "view_products",
    "edit_products",
    "view_orders",
    "edit_orders",
  ];

  let permissions = [];

  for (let i = 0; i < perms.length; i++) {
    permissions.push(
      await permissionRepository.save({
        name: perms[i],
      })
    );
  }

  const roleRepository = getManager().getRepository(Role);

  await roleRepository.save({
    name: "Admin",
    permissions
  });

  delete permissions[3];

  await roleRepository.save({
    name: "Editor",
    permissions
  });

  delete permissions[1];
  delete permissions[5];
  delete permissions[7];

  await roleRepository.save({
    name: "Viewer",
    permissions
  });

  process.exit(0); // for manuely stop the process( npm run roles:seed)
});
