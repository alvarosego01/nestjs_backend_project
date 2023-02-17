import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleType } from "../../roles/enum/roletype.enum";
import { SameUserAuthGuard, SameUserOrAdminGuard } from "../guards";
import { UserRoleGuard } from "../guards/user-role.guard";
import { RoleProtect } from "./role-protect.decorator";


export function Auth(...roles: RoleType[]) {

    return applyDecorators(
        RoleProtect(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard)

        // UseGuards(AuthGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function Auth_SameID(...roles: RoleType[]) {

    return applyDecorators(
        RoleProtect(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard, SameUserAuthGuard)

        // UseGuards(AuthGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function Auth_SameIdOrAdmin(...roles: RoleType[]) {

    return applyDecorators(
        RoleProtect(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard, SameUserOrAdminGuard)

        // UseGuards(AuthGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

