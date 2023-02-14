import { getUUID } from "../shared/utils/util-service";
import { Knex } from "knex";

const userModule = "user_module";
const { rolesTable } = {
  rolesTable: `${userModule}.user_roles`,
};

interface userRole {
  id: string;
  role_id: number;
  name: string;
  label: string;
  description: string;
}

enum UserRolesId {
  CLIENT = 1,
  CREATIVE = 2,
  FRANCHISE = 3,
  SUB_FRANCHISE = 4,
  ADMIN = 5,
  SUPER_ADMIN = 6,
}

async function adduserRoles(knex: Knex) {
  const roles: userRole[] = [
    { id: getUUID(), role_id: UserRolesId.CLIENT, name: "client", label: "Client", description: "persons who are on the platfor to interract with products and services." },
    { id: getUUID(), role_id: UserRolesId.CREATIVE, name: "creative", label: "Creative", description: "persons on the platform to sale art or render services." },
    { id: getUUID(), role_id: UserRolesId.FRANCHISE, name: "franchise", label: "Franchise", description: "persons on the patform whose role is to oversee creatives in a location." },
    { id: getUUID(), role_id: UserRolesId.SUB_FRANCHISE, name: "sub-franchise", label: "Sub-Franchise", description: "persons on the patform whose role is coach creatives assigned them." },
    { id: getUUID(), role_id: UserRolesId.ADMIN, name: "admin", label: "admin", description: "persons on the patform who have administrative roles to oversee other roles." },
    { id: getUUID(), role_id: UserRolesId.SUPER_ADMIN, name: "super-admin", label: "Super-Admin", description: "persons on the patform with all access and permissions." },
  ];

  await knex.table(rolesTable).insert(roles);
}

export async function up(knex: Knex): Promise<any> {
  // add new stages
  await adduserRoles(knex);
}

export async function down(knex: Knex): Promise<any> {
  // drop ALL SEEDED COLUMNS
  await knex.table(rolesTable).where({ id: UserRolesId.ADMIN }).orWhere({ id: UserRolesId.CLIENT }).orWhere({ id: UserRolesId.CREATIVE }).orWhere({ id: UserRolesId.FRANCHISE }).orWhere({ id: UserRolesId.SUB_FRANCHISE }).orWhere({ id: UserRolesId.SUPER_ADMIN }).delete();
}
