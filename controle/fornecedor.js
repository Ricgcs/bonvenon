import {conectar} from "../conexao/conexao.js"
const con = await conectar();

export const validarFornecedor = async (valor) => {
  const sql = `select count(nome) as valida from fornecedores where nome = "${valor}"`;
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
    INSERT INTO Fornecedores 
      (nome, CNPJ, Inscricao, Endereco, Municipio, Estado, CEP, Contato, Telefone, Fax, Ult_Custo, Bairro, Data_Ult_Mov, Observacao, Tipo_Fornecedor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = await con.query(sql, [
      valor.nome,
      valor.CNPJ,
      valor.Inscricao,
      valor.Endereco,
      valor.Municipio,
      valor.Estado,
      valor.CEP,
      valor.Contato,
      valor.Telefone,
      valor.Fax,
      valor.Ult_Custo,
      valor.Bairro,
      valor.Data_Ult_Mov,
      valor.Observacao,
      valor.Tipo_Fornecedor
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar fornecedor:", error);
    throw error;
  }
};
