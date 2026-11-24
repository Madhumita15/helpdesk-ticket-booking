export const ENDPOINT = {
  login: "/auth/login",
  logout: "/auth/logout",
  createUser: "/admin/create-user",
  ticket: {
    list: "/tickets",
    create: "/tickets",
    get: (id: string) => `/tickets/${id}`,
    update: (id: string) => `/tickets/${id}`,
    delete: (id: string) => `/tickets/${id}`,
    assignList: "/tickets/assign",
    assign: (id: string) => `/tickets/${id}/assign`,
    resolve: (id: string) => `/tickets/${id}/resolve`,
    close: (id: string) => `/tickets/${id}/closed`,
    priority: (id: string) => `/tickets/${id}/priority`,
  },
  user: {
    profile: "/user/profile",
    all: "/user/all",
  },
};
