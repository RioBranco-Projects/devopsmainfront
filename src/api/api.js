// src/api/api.js

const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Procura um usuário com o email e a senha fornecidos
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        // Armazena o estado de autenticação
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        return { success: true };
    } else {
        return { success: false, error: "Email ou senha incorretos." };
    }
};

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
};

// Função para logout
const logoutUser = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
};

export default {
    loginUser,
    isAuthenticated,
    logoutUser,
};
