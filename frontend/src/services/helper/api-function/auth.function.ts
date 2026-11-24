import { axiosInstance } from "../../../lib/axiosInstance";
import type { LoginDataType, UserData } from "../../../typescript/types/user.type";
import { ENDPOINT } from "../endPoint";
import { getErrorMessage } from "../global.helper";

export const login = async (data: LoginDataType) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.login, data);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post(ENDPOINT.logout);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const createUser = async (data: UserData) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.createUser, data);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.user.profile);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.user.all);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
