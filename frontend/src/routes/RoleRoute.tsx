import type { ReactNode } from 'react';
import type { UserRole } from '../types/user';
export default function RoleRoute({children,_allowedRoles}:{children:ReactNode;_allowedRoles?:UserRole[]}){return <>{children}</>}
