const express = require("express");
const router = express.Router();
const db = require("../models");

// Criar um novo usuário (POST /users)
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newUser = await db.User.create({ firstName, lastName });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário.", details: error.message });
  }
});

// Obter todos os usuários (GET /users)
router.get("/", async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários.", details: error.message });
  }
});

module.exports = router;

