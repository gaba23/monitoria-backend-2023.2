import { Router } from "express";
import { prisma } from "../prisma.js";
import multer from "multer";
import path from "path";

export const postRouter = Router();

const express = require('express');
const multer = require('multer');

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Array para armazenar as postagens
const postagens = [];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file ? '/uploads/' + req.file.filename : null;
  const postId = Date.now();
  postagens.push({
    postId: postId,
    imagePath: imagePath,
    timestamp: new Date().toLocaleString()
  });

  res.json({ success: true, postId: postId });
});

// Rota para obter todas as postagens como JSON
app.get('/postagens', (req, res) => {
  res.json(postagens);
});
