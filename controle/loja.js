import {conectar} from "../conexao/conexao.js";

const con = await conectar();

export const validarLoja = async(valor)=>{
const sql = `select count(nome) as lojas from loja where nome = (?)`;
try{
const result = await con.query(sql,valor);
return result;
}
catch(error){
console.log(error);
}
}

export const cadastroLoja = async (valor) => {
    console.log(valor);
  let sql = `INSERT INTO loja(rede, numero_loja, sequencia, nome, nome_responsavel, locacao_fixo, locacao_comissao, valor, email, telefone, whatsapp, rota, cep, endereco, complemento, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const result = await con.query(sql, [
      valor.rede,
      valor.numeroLoja,
      valor.sequencia,
      valor.nomeLoja,
      valor.nomeResp,
      valor.locacaoFixo,
      valor.locacaoComissao,
      valor.valor,
      valor.email,
      valor.telefone,
      valor.whatsapp,
      valor.rota,
      valor.cep,
      valor.endereco,
      valor.complemento,
      valor.numero,
      valor.bairro,
      valor.cidade,
      valor.estado
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
}