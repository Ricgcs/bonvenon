import {conectar} from "../conexao/conexao.js"

const con = await conectar();

export const validarRack = async(valor)=>{
const sql = `select count(nome) as racks from rack where nome = (?)`;
try{
const result = await con.query(sql,valor);
return result;
}
catch(error){
console.log(error);
}
}

export const cadastroRack = async(rack)=>{
const sql = `insert into rack(nome,medidas,cor) values (?,?,?)`;
try{
 await con.query(sql,[rack.nome,rack.medidas,rack.cor]);
}
catch(error){
console.log(error);
}
};