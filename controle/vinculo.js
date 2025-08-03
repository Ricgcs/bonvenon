import {conectar} from "../conexao/conexao.js"

const con = await conectar();

export const vincular = async(valor)=>{
const sql = `insert into vinculo_maquina(rede,loja,tipo_maquina,maquina) values(?,?,?,?)`;

try{
con.query(sql,[valor.rede,valor.loja,valor.tipo_maquina,valor.maquina]);
}
catch(error){
console.log(error);
}

};