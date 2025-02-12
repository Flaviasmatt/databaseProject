const express = require("express");
const router = express.Router();
const db = require("../models");

// 🚀 Log para confirmar que a rota foi carregada corretamente
console.log("🚀 Rotas de rates carregadas com sucesso!");

// Criar uma nova avaliação (POST /rates)
router.post("/", async (req, res) => {
  try {
    console.log("📌 Dados recebidos no POST /rates:", req.body);

    const { value, UserId, HotelId } = req.body;

    // Validar se os campos foram enviados corretamente
    if (!value || !UserId || !HotelId) {
      return res.status(400).json({ error: "Os campos value, UserId e HotelId são obrigatórios." });
    }

    // Validar se o valor da avaliação está entre 1 e 5
    if (value < 1 || value > 5) {
      return res.status(400).json({ error: "O valor da avaliação deve estar entre 1 e 5." });
    }

    // Criar a avaliação no banco de dados
    const rate = await db.Rate.create({ value, UserId, HotelId });
    res.status(201).json(rate);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar avaliação.", details: error.message });
  }
});

// Obter todas as avaliações (GET /rates)
router.get("/", async (req, res) => {
  try {
    console.log("✅ GET /rates chamado!");

    const rates = await db.Rate.findAll({
      include: [db.User, db.Hotel]
    });
    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar avaliações.", details: error.message });
  }
});

// Obter avaliações por hotel (GET /rates/hotel/:hotelId)
router.get("/hotel/:hotelId", async (req, res) => {
  try {
    const rates = await db.Rate.findAll({ where: { HotelId: req.params.hotelId } });

    if (!rates.length) {
      return res.status(404).json({ error: "Nenhuma avaliação encontrada para este hotel." });
    }

    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar avaliações.", details: error.message });
  }
});

// Obter avaliações por usuário (GET /rates/user/:userId)
router.get("/user/:userId", async (req, res) => {
  try {
    const rates = await db.Rate.findAll({ where: { UserId: req.params.userId } });

    if (!rates.length) {
      return res.status(404).json({ error: "Nenhuma avaliação encontrada para este usuário." });
    }

    res.status(200).json(rates);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar avaliações.", details: error.message });
  }
});

// Atualizar uma avaliação pelo ID (PUT /rates/:id)
router.put("/:id", async (req, res) => {
  try {
    const { value } = req.body;

    const rate = await db.Rate.findByPk(req.params.id);
    
    if (!rate) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    if (value < 1 || value > 5) {
      return res.status(400).json({ error: "O valor da avaliação deve estar entre 1 e 5." });
    }

    await rate.update({ value });
    res.status(200).json({ message: "Avaliação atualizada com sucesso!", rate });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar avaliação.", details: error.message });
  }
});

// Excluir uma avaliação pelo ID (DELETE /rates/:id)
router.delete("/:id", async (req, res) => {
  try {
    const rate = await db.Rate.findByPk(req.params.id);
    
    if (!rate) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    await rate.destroy();
    res.status(200).json({ message: "Avaliação deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar avaliação.", details: error.message });
  }
});

module.exports = router;
