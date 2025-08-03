import mysql from "mysql2/promise";

export const conectar = async()=>{
    if(global.conectar && global.conectar.state === 'connected') {
        return global.conectar;
    }
    const conexao = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ricardo',
        database: 'projetonegosimples'  
})
global.conectar = conexao;
return conexao; 

}