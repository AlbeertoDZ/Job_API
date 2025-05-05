// models/users.model.js
module.exports = {
  // Para sendRecoveryEmail y changePassword
  findOne: async (query) => {
    // Simula que solo existe este usuario de test
    if (query.email === "test@correo.com") {
      return {
        email: query.email,
        password: "hashFalso",
        recoveryToken: null,
        recoveryExpires: null,
        save: async () => {},
      };
    }
    return null;
  },
};
