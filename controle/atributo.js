import {conectar} from "../conexao/conexao.js";

const con = await conectar();

export const validarProduto = async (valor) => {
  const sql = `select count(nome) as valida from produto where nome = "${valor}"`;
  try{
    const result = con.query(sql);
    return result;
  }
  catch(error){
    console.log(error);
  }
}



export const cadastroProduto = async(produto)=>{
    const sql = "insert into produto(nome,abreviatura,descricao,custo,venda,fornecedor_id,tipo_maquina_id) values (?,?,?,?,?,?,?)";
    try{
        await con.query(sql,[produto.nome,produto.abreviatura,produto.descricao,produto.custo,produto.venda,produto.fornecedor,produto.tipoMaquina]);
    }
    catch(error){
        console.log(error);
    }
}
