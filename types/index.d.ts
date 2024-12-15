declare type SidebarProps = {
  user: User;
};

declare type User = {
  $id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};
