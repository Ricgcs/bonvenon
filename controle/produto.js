import {conectar} from "../conexao/conexao.js"

const con = await conectar();

export const validar = async(onde,valor)=>{
let sql = `select count(nome) as qtd from ${onde} where nome = (?)`;
try{
    const result = await con.query(sql,valor);
    return result;
}
catch(error){
    console.log(error);
}
};

export const cadastro = async(onde,valor) => {
let sql = `insert into ${onde}(nome) values (?)`;
try{
    const result = await con.query(sql,valor);
}
catch(error){
    console.log(error);
}
};