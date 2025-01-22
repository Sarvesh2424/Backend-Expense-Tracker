const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://10650sarvesh:choc2424@cluster0.7h1gq.mongodb.net/expenses"
  )
  .then(() => {
    console.log("connected to mongodb");
  });

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    if (!expenses) {
      return res.status(404).json({ message: "No responses found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "No expenses found" });
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  try {
    const expenses = await Expense.findOne({ id: req.params.id });
    if (!expenses) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "No expenses found" });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) {
      return res
        .status(400)
        .json({ message: "Please provide both title and amount" });
    }
    const newExpense = new Expense({
      id: uuidv4(),
      title,
      amount,
    });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "No expenses found" });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const expenses = await Expense.findOneAndDelete({ id });
  if (!expenses) {
    res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ message: "Deleted sucessfully" });
  res.status(204).end();
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const expenses = await Expense.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!expenses) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expenses);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "No expenses found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://127.0.0.1:3000");
});
