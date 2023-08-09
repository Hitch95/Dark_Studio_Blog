import { baseRepository } from "./baseRepository";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const userRepository = {
  insertUser: async (username, email, password) => {
    try {
      const userId = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

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

  findUser: async (id) => {
    return await baseRepository.findOne("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
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

  removeUserWhere: async (where, whereValue) => {
    return await baseRepository.removeWhere("users", where, whereValue);
  },
};

export async function verifyUser(userId) {
  const data = await baseRepository.getUser(userId);
  console.log(data)
  return data[0][0].is_admin;
}