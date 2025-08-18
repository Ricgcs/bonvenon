import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { cadastro, validar } from "./produto.js";
import { cadastroLoja, validarLoja } from "./loja.js";
import { cadastroFornecedor, validarFornecedor } from "./fornecedor.js";
import { pesquisa, pesquisa_inputs, ver, deletar } from "./cods.js";
import { cadastroRota, validarRota } from "./rota.js";
import { cadastroProduto, validarProduto } from "./atributo.js";
import { cadastroMaquina, validarMaquina } from "./maquina.js";
import { cadastroRack, validarRack } from "./rack.js";
import { vincular } from "./vinculo.js";
const app = express();
const host = "127.0.0.1";
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/deletar",async(req,res)=>{
const valor = req.body.valor;
  try {
    const valido = await deletar(valor.onde, valor.valor);

  }
catch(error){
  console.log(error);
}
});

app.post("/cadastro/atributo", async (req, res) => {
  const valor = req.body.valor;

  try {
    const valido = await validar(valor.onde, valor.valor);
    const validacao = valido[0][0].qtd;
    if (validacao > 0) {
      res.json({ res: 1 });
    } else {
      await cadastro(valor.onde, valor.valor);
      res.json({ res: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro/loja", async (req, res) => {
  const valor = req.body.valor;
  const valida = await validarLoja(valor.nomeLoja);
  const valida2 = valida[0][0].lojas;
  if (valida2 > 0) {
    res.json({ res: 1 });
  } else {
    await cadastroLoja(valor);
    res.json({ res: 0 });
  }
});

app.post("/cadasto/fornecedor", async (req, res) => {
  const valor = req.body.valor;

  try {
    const valida = await validarFornecedor(valor.nome);
    let validacao = valida[0][0].valida;

    if (validacao > 0) {
      res.json({ res: 1 });
    } else {
      await cadastroFornecedor(valor);
      res.json({ res: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro/rota", async (req, res) => {
  const valor = req.body.valor;

  try {
    const valida = await validarRota(valor.nome);
    let validacao = valida[0][0].valida;

    if (validacao > 0) {
      res.json({ res: 1 });
    } else {
      await cadastroRota(valor);
      res.json({ res: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro/produto", async (req, res) => {
  const valor = req.body.valor;
  try {
    const valida = await validarProduto(valor.nome);
    let validacao = valida[0][0].valida;

    if (validacao > 0) {
      res.json({ res: 1 });
    } else {
      await cadastroProduto(valor);
      res.json({ res: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro/maquina", async (req, res) => {
  const valor = req.body.valor;
  try {
    const valida = await validarMaquina(valor.nome);
    let validacao = valida[0][0].maquinas;
    if (validacao > 0) {
      res.json({ res: 1 });
    } else {
      await cadastroMaquina(valor);
      res.json({ res: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro/rack", async (req, res) => {
  const valor = req.body.valor;
try {
    const valido = await validarRack(valor.nome);
    const validacao = valido[0][0].racks;
    if (validacao > 0) {
      res.json({ res: 1 });
    } else {
      await cadastroRack(valor);
      res.json({ res: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastro/vinculo", async (req, res) => {
  const valor = req.body.valor;
  try {
    await vincular(valor);
  } catch (error) {
    console.log(error);
  }
});

app.get("/ver/:valor/:onde", async (req, res) => {
  const valor = req.params.valor;
  const onde = req.params.onde;
  try {
    const resultados = await ver(valor, onde);
    res.json(resultados);
  } catch (error) {
    console.log(error);
  }
});

app.get("/pesquisa/:valor/:onde/:variavel/:comparador", async (req, res) => {
  const valor = req.params.valor;
  const onde = req.params.onde;
  const variavel = req.params.variavel;
  const comparador = req.params.comparador;

  try {
    const resultados = await pesquisa_inputs(valor, onde, variavel, comparador);
    res.json({ resultados });
  } catch (error) {
    console.log(error);
  }
});

app.post("/pesquisa/campos/bd",async (req,res) => {
  const valor = req.body.valor;
  const oque = valor.valor1;
  const onde = valor.onde;
  const antes = valor.valor2;
  const depois = valor.valor3;
  try{
   const teste = await pesquisa(oque,onde,antes,depois);
   const teste2 = teste[0];
   console.log("o que:",teste2);
  res.json({res:teste2});
  }
  catch(error){
    console.log(error);
  }
})

app.listen(port, host, () => {
  console.log("Servidor rodando");
});
