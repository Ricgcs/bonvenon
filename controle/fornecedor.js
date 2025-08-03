import {conectar} from "../conexao/conexao.js"
const con = await conectar();

export const validarFornecedor = async (valor) => {
  const sql = `select count(nome) as valida from fornecedor where nome = "${valor}"`;
  try{
    const result = con.query(sql);
    return result;
  }
  catch(error){
    console.log(error);
  }
}

export const cadastroFornecedor = async (valor) => {
  const sql = `
    INSERT INTO fornecedor (nome, email, telefone, whatsapp)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const result = await con.query(sql, [
      valor.nomeFornecedor,
      valor.email,
      valor.telefone,
      valor.whatsapp
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};