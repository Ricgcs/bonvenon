import {conectar} from "../conexao/conexao.js"

const con = await conectar();

export const validarRota = async (valor) => {
  const sql = `select count(nome) as valida from rota where nome = "${valor}"`;
  try{
    const result = con.query(sql);
    return result;
  }
  catch(error){
    console.log(error);
  }
}

export const cadastroRota = async(rota)=>{
    const sql = `insert into rota(nome,rede,loja_id) values(?,?,?)`;
    try{
       await con.query(sql,[rota.nome,rota.rede,rota.loja]);
    }
    catch(error){
        console.log(error);
    }

}