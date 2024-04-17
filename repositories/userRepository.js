import { baseRepository } from "./baseRepository";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const userRepository = {
  insertUser: async (username, email, password) => {
    try {
      const userId = uuidv4();
      const hashedPassword = await hashPassword(password);

      await baseRepository.insert(
        "users",
        ["id", "username", "email", "password"],
        [userId, username, email, hashedPassword]
      );

      console.log("Utilisateur inséré avec succès !");

      return "User has been created";
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      throw new Error(error.message);
    }
  },

  deleteUser: async (id) => {
    return await baseRepository.remove("users", id);
  },

  findUserById: async (id) => {
    return await baseRepository.findOne("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
  },

  findUserByEmail: async (email) => {
    return await baseRepository.findOne(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
  },

  findAllUsers: async () => {
    return await baseRepository.findAll("users");
  },

  updateUser: async (id, entries) => {
    return await baseRepository.update("users", id, entries);
  },

  updateUserWhere: async (where, whereValue, entries) => {
    return await baseRepository.updateWhere(
      "users",
      where,
      whereValue,
      entries
    );
  },

  updateUserPassword: async (id, newPassword) => {
    const hashedPassword = await hashPassword(newPassword);
    return updateUserWhere('id', id, { password: hashedPassword });
  },

  removeUserWhere: async (where, whereValue) => {
    return await baseRepository.removeWhere("users", where, whereValue);
  },
};

export async function verifyUser(userId) {
  const data = await baseRepository.getUser(userId);
  console.log(data)
  return data[0][0].is_admin;
}