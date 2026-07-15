import api from "./auth.service";

export const updateProfile = async ({ fullName, phone, address }) => {
  const { data } = await api.put("/api/users/profile", {
    fullName,
    phone,
    address,
  });

  return data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await api.put("/api/users/change-password", {
    currentPassword,
    newPassword,
  });

  return data;
};