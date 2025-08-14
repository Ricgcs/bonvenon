import {conectar} from "../conexao/conexao.js"

const con = await conectar();

export const ver = async (valor, onde)=>{
const sql = `SELECT ${valor} FROM ${onde}`;
try{
     const resposta =  await con.query(sql);
     return resposta[0];
}
catch(error){
    console.log(error);
}
};

export const pesquisa_inputs = async(valor,onde, variavel, comparador)=>{
const sql = `select ${valor} from ${onde} where ${variavel} = (?)`;

try{
 const resposta = await con.query(sql,comparador);
 return resposta;
}
catch(error){
console.log(error);
}
}

export const pesquisa = async (oque, onde, antes, depois) => {
  let sql = "SELECT id,";
    if(!oque.length && !antes.length && !depois.length){
         sql = `SELECT * from ${onde}`;
        
    }
     else if(!antes.length && !depois.length){
         sql = "SELECT id,"+oque.join(", ") + " FROM " + onde;
    }

    else{
   sql = oque.length 
      ? `SELECT id, ${oque.join(", ")} FROM ${onde} WHERE `
      : `SELECT * FROM ${onde} WHERE `;

  const condicoes = antes.map((coluna, index) => {
    const valor = depois[index];

    const valorSql = isNaN(valor)?  `'${valor}'`: valor;         

    
    return `CAST(${coluna} AS CHAR) = CAST(${valorSql} AS CHAR)`;
  });


  sql += condicoes.join(" AND ");

}
  try{
    const envio = await con.query(sql);
    return envio;
  }
  catch(error){
    console.log(error);
  }
};

export const deletar = async(onde, valor) =>{
const sql = `delete from ${onde} where id = ${valor}`;
try{
const result = con.query(sql);
return result;
}
catch(error){
  console.log(error);
}
}
