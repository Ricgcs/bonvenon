import {conectar} from "../conexao/conexao.js"

const con = await conectar();

export const validarMaquina = async(valor)=>{
const sql = `select count(nome) as maquinas from maquina where nome = (?)`;
try{
const result = await con.query(sql,valor);
return result;
}
catch(error){
console.log(error);
}
}

export const cadastroMaquina = async(maquina)=>{
    const sql = `insert into maquina(nome,descricao,tamanho,formato,cor,quantidade,chave_cofre,chave_maquina,fabricante,tipo_maquina) values (?,?,?,?,?,?,?,?,?,?)`;
    try{
       await con.query(sql,[maquina.nome,maquina.descricao,maquina.tamanho,maquina.formato,maquina.cor,maquina.quantidade,maquina.chave_cofre,maquina.chave_maquina,maquina.fabricante,maquina.tipo_maquina])
    }
    catch(error){
        console.log(error);
    }
}