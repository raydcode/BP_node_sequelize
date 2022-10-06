import { User } from "../../../models";

export const CreateUser = ({ firstName, lastName, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.insert({ firstName, lastName, email, password });
      resolve(true);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
