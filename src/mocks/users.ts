import { IUser, USER_ROLES } from '../types';

const users: IUser[] = [
  {
    _id: '48348f74-13dd-4d4e-b639-6c2f02bf4854',
    username: 'admin',
    name: 'Admin Account',
    email: 'admin@my-site.com',
    role: USER_ROLES.ADMIN,
    // Password: 12345
    password: '$2a$10$Pp5neK94Rw1g/davjo9Lz.X8ErR9Usoju3xrSVg1fhC9veDoDOt7m',
  },
  {
    _id: 'ba500896-80ca-42bd-b7f7-a743b959203e',
    username: 'visitor',
    name: 'User Account',
    email: 'visitor@my-site.com',
    role: USER_ROLES.VISITOR,

    // Password: 13579
    password: '$2a$10$tbe4Dzh3WltWn7.SqlKYE.zvfGnPfEfKgvDxdfyPCyasTaHHUsyxi',
  },
  {
    _id: '091248e6-b150-4ebf-910a-ae7a59174c11',
    username: 'visitor-1',
    name: 'User Account 1',
    email: 'visitor-1@my-site.com',
    role: USER_ROLES.VISITOR,
    // Password: 024680
    password: '$2a$10$gZiCHOvv3Vl0wg.pzlqr9eOWxsH9vkR2NDABbaniNTdsEEupkt816',
  },
];

export default users;
