async function envio(url, valor) {
  try {
    const envio = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor: valor }),
    });
    const envio_2 = await envio.json();
    const envio_3 = envio_2.res;
    return envio_3;
  } catch (error) {
    console.log("Erro post:", error);
    return 3;
  }
}

async function receber(valor, onde) {
  try {
    const dados = await fetch(`http://localhost:3000/ver/${valor}/${onde}`, {
      method: "GET",
    });

    const response = await dados.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function pesquisaInput(valor, onde, variavel, comparador) {
  try {
    const dados = await fetch(
      `http://localhost:3000/pesquisa/${valor}/${onde}/${variavel}/${comparador}`,
      {
        method: "GET",
      }
    );

    const response = await dados.json();
    return response.resultados[0];
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  let menu = document.getElementById("barra_esquerda");
  let classMenu = document.getElementsByClassName("buttonMenu");
  let texto_produto = document.getElementById("text_div_buttonProduto_menu");
  let seta = document.getElementById("seta_div_buttonProduto_menu");
  menu.style.width = "4%";
  let btn_menu_seta = document.getElementById("btn_img_menu_seta");
  let btn_menu = document.getElementById("btn_menu");

  let cadastros = document.getElementById("cadastros");
  let btn_produto = document.getElementById("buttonMenu_produtos");

  let tela_cadastro = document.getElementById("barra_direita");

  texto_produto.classList = "semTexto";
  cadastros.classList = "classProduto_fechado";
  cadastros.innerHTML = " ";
  menu.addEventListener("mouseenter", () => {
    menu.classList = "menuAberto";
    btn_menu_seta.classList = "btn_img_menu_seta_abrir";
    menu.style.width = "17%";
    texto_produto.classList = "texto_voltar";

    btn_produto.addEventListener("click", () => {
      cadastros.classList = "classProduto_aberto";

      //<button id="tipoProduto">Tipo produto</button>
      //<button id="tipoMaquina">Tipo máquina</button>
      //<button id="rede">Rede</button>
      cadastros.innerHTML = `
<button id="fornecedor">Fornecedor</button>
<button id="rota">Rota</button>
<button id="produto">Produto</button>
<button id="loja">Loja</button>
<button id="maquina">Máquina</button>
<button id="atributo">Atributo</button>
<button id="rack">Rack</button>
<button id="vincular">Vincular</button>
  `;

      // let tipoProduto = document.getElementById("tipoProduto");
      let fornecedor = document.getElementById("fornecedor");
      // let rede = document.getElementById("rede");
      let rota = document.getElementById("rota");
      let produto = document.getElementById("produto");
      let loja = document.getElementById("loja");
      // let tipoMaquina = document.getElementById("tipoMaquina");
      let maquina = document.getElementById("maquina");
      let atributo = document.getElementById("atributo");
      let rack = document.getElementById("rack");
      // tipoProduto.addEventListener("click", () => {
      //   tela_cadastro.innerHTML = " ";
      //   tela_cadastro.innerHTML =
      //     '<div id="tela_branca"><div id="topo_telaBranca">Tipo produto<hr id="hrTipoProduto"></div></div>';
      // });
      let vincular = document.getElementById("vincular");

      vincular.addEventListener("click", async () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `
        <div id="tela_branca">
        <div id="topo_telaBranca">
        Vincular máquina
        <hr id="hrVincular">
        </div>

        <div id="divVincularMaquina"> 

        <div id="divCadastroVincularRedeLoja">

        <div id="divSelectVincularRede">
        <h4 data-value="rede">Rede</h4>
          <select id="selectVincularRedes">  
          <option disabled selected>--Selecione uma rede--</option>
          </select>
        </div>

        <div id="divSelectVincularLoja">
        <h4 data-value="loja">Loja</h4>
          <select id="selectVincularLojas">  
          <option disabled selected>--Selecione uma loja--</option>
          </select>
        </div>
        </div>

         
        <div id="divSelectVincularTipoMaquinaMaquina">
        <div id="divSelectVincularTipoMaquina">
        <h4 data-value="tipo_maquina">Tipo máquina</h4>
          <select id="selectVincularTipoMaquina">  
          <option disabled selected>--Selecione uma tipo máquina--</option>
          </select>
        </div>

        <div id="divSelectVincularMaquina">
        <h4 data-value="maquina">Máquina</h4>
          <select id="selectVincularMaquina">  
          <option disabled selected>--Selecione uma máquina--</option>
          </select>
        </div>
        </div>
        <div id="divButtonVincularMaquina">
        <button id="btnVincularMaquina">Vincular+</button>
        </div>
        </div>
        </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 4) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 4) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "vinculo_maquina",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };

            console.log(objPesquisa);

            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });



        const inputRede = document.getElementById("selectVincularRedes");
        const inputLoja = document.getElementById("selectVincularLojas");
        const dadosRede = await receber("nome", "rede");
        dadosRede.forEach((dados) => {
          inputRede.innerHTML += `<option>${dados.nome}</option>`;
        });

        inputRede.addEventListener("change", async () => {
          const rede = document.getElementById("selectVincularRedes").value;
          const dadosLoja = await pesquisaInput("nome", "loja", "rede", rede);
          dadosLoja.forEach((dados) => {
            inputLoja.innerHTML += `<option>${dados.nome}</option>`;
          });
        });

        const inputTipoMaquina = document.getElementById(
          "selectVincularTipoMaquina"
        );
        const inputMaquina = document.getElementById("selectVincularMaquina");

        const dadosTipoMaquina = await receber("nome", "tipo_maquina");
        dadosTipoMaquina.forEach((dados) => {
          inputTipoMaquina.innerHTML += `<option>${dados.nome}</option>`;
        });

        inputTipoMaquina.addEventListener("change", async () => {
          const tipo_maquina = document.getElementById(
            "selectVincularTipoMaquina"
          ).value;
          const tipo_maquina_envio = await pesquisaInput(
            "id",
            "tipo_maquina",
            "nome",
            tipo_maquina
          );
          const tipo_maquina_id = tipo_maquina_envio[0].id;
          const dadosMaquina = await pesquisaInput(
            "nome",
            "maquina",
            "tipo_maquina",
            tipo_maquina_id
          );
          dadosMaquina.forEach((dados) => {
            inputMaquina.innerHTML += `<option>${dados.nome}</option>`;
          });
        });

        document
          .getElementById("btnVincularMaquina")
          .addEventListener("click", async () => {
            const rede = document.getElementById("selectVincularRedes").value;
            const loja = document.getElementById("selectVincularLojas").value;
            const tipoMaquina = document.getElementById(
              "selectVincularTipoMaquina"
            ).value;
            const maquina = document.getElementById(
              "selectVincularMaquina"
            ).value;
            const objvinculo = {
              rede: rede,
              loja: loja,
              tipo_maquina: tipoMaquina,
              maquina: maquina,
            };

            await envio("http://localhost:3000/cadastro/vinculo", objvinculo);
          });
      });

      fornecedor.addEventListener("click", () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `
        <div id="tela_branca">
        <div id="topo_telaBranca">
        Fornecedor<hr id="hrFornecedor">
        </div>
        <div id="inputs">
          <div id = "divInputNomeFornecedor">
        <h4 id="h4NomeFornecedor" data-value="nome">Nome do fornecedor</h4>
        <input id="inputNomeFornecedor" placeholder="Nome fornecedor" type="text">
          </div>
          <div id="divInputEmailTelefoneWhatsapp">
          
          <div id="divInputEmail">
          <h4 data-value="email">Email</h1>
          <input id = "inputEmail" placeholder="Email fornecedor" type="email">
          </div>
          
          <div id="divInputTelefone">
          <h4 data-value="telefone">Telefone</h1>
          <input id = "inputTelefone" placeholder="Telefone fornecedor" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" type="tel">
          </div>
          
          <div id="divInputWhatsapp">
          <h4 data-value="whatsapp">Whatsapp</h1>
          <input id = "inputWhatsapp" placeholder="Whatsapp fornecedor" type="tel">
          </div>
          
          </div>
          <div id="divButtonCadastroFornecedor">
          <button id="ButtonCadastroFornecedor">+ Cadastro</button>
          </div>
        </div>
        </div>
          </div>
        </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 4) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 4) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "fornecedor",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };

            console.log(objPesquisa);

            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });

        
        document
          .getElementById("ButtonCadastroFornecedor")
          .addEventListener("click", async () => {
            const nomeFornecedor = document.getElementById(
              "inputNomeFornecedor"
            ).value;
            const email = document.getElementById("inputEmail").value;
            const telefone = document.getElementById("inputTelefone").value;
            const whatsapp = document.getElementById("inputWhatsapp").value;

            const fornecedorobj = {
              nomeFornecedor: nomeFornecedor,
              email: email,
              telefone: telefone,
              whatsapp: whatsapp,
            };
            try {
              //7

              if (
                nomeFornecedor == "" ||
                email == "" ||
                telefone == "" ||
                whatsapp == ""
              ) {
                alert("Preencha todos os campos");
                return;
              } else {
                let resultado = await envio(
                  "http://localhost:3000/cadasto/fornecedor",
                  fornecedorobj
                );

                if (resultado == 1) {
                  alert(`${nomeFornecedor} já existe`);
                } else if (resultado == 3) {
                  alert("Erro");
                } else {
                  alert(`${nomeFornecedor} cadastrado com sucesso`);
                }
              }
            } catch (error) {
              console.log(error);
            }
          });
      });
      // rede.addEventListener("click", () => {
      //   tela_cadastro.innerHTML = " ";
      //   tela_cadastro.innerHTML = '<div id="tela_branca"></div>';
      // });

      rota.addEventListener("click", async () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `
  <div id="tela_branca">
    <div id="topo_telaBranca">
      Rota
      <hr id="hrRota" >
    </div>        

    <div id="divInputRotaRedeLoja">

      <div id="divInputRota">
        <h4 id="h4Rota" data-value="nome">Rota</h4>
        <input id="inputRota" placeholder="Rota">
      </div>

      <div id="divInputRedeLoja">

        <div id="divInputRede">
          <h4 id="h4Rede" data-value="rede">Rede</h4>
          <select id="selectRedes">  
            <option disabled selected>--Selecione uma rede--</option>
          </select>
        </div>

        <div id="divInputLoja">
          <h4 id="h4Loja" data-value="loja_id">Loja</h4>
          <select id="selectLoja">
            <option disabled selected>--Selecione uma rede--</option>
          </select>
        </div>

      </div>

      <div id="divButtonCadastroRota">
        <button id="buttonCadastroRota">+Cadastro</button>
      </div>  

    </div>
  </div>
  
  </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 3) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 3) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "rota",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };

            console.log(objPesquisa);

            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });

        

        const selectLoja = document.getElementById("selectLoja");
        const selectRede = document.getElementById("selectRedes");
        const dados = await receber("*", "rede");
        console.log(dados);
        dados.forEach((rede) => {
          selectRede.innerHTML += `<option>${rede.nome}</option>`;
        });

        selectRede.addEventListener("change", async () => {
          //3
          selectLoja.innerHTML = ` <option disabled selected>--Selecione uma rede--</option>`;

          const a = selectRede.value;

          const lojas = await pesquisaInput("*", "loja", "rede", a);
          lojas.forEach((unidade) => {
            selectLoja.innerHTML += `<option>${unidade.nome}</option>`;
          });
        });

        document
          .getElementById("buttonCadastroRota")
          .addEventListener("click", async () => {
            const rota = document.getElementById("inputRota").value;
            const rede = document.getElementById("selectRedes").value;
            const loja = document.getElementById("selectLoja").value;

            if (
              rota == "" ||
              rede == "--Selecione uma rede--" ||
              loja == "--Selecione uma rede--"
            ) {
              alert("Preencha todos os campos");
              return;
            } else {
              const rede_recebe = await pesquisaInput(
                "id",
                "rede",
                "nome",
                rede
              );
              const rede_id = rede_recebe[0].id;
              const loja_recebe = await pesquisaInput(
                "id",
                "loja",
                "nome",
                loja
              );
              const loja_id = loja_recebe[0].id;
              const dados = { nome: rota, rede: rede_id, loja: loja_id };
              try {
                let env = await envio(
                  "http://localhost:3000/cadastro/rota",
                  dados
                );
                if (env == 0) {
                  alert(`${rota} cadastrado com sucesso`);
                } else if (env == 1) {
                  alert(`${rota} ja existe`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
      });

      produto.addEventListener("click", async () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `<div id="tela_branca">
         <div id="topo_telaBranca">
         Produtos
         <hr id="hrProduto">
         </div>        
         <div id="divNomeAbreviatura">

         <div id="divInputNome">
         <h4 id="h4NomeProduto" data-value="nome">Nome produto</h4>
         <input id="inputNomeProduto" placeholder="Nome produto">
         </div>

         <div id="divInputAbreviatura">
         <h4 id="h4Abreviacao" data-value="abreviatura">Abreviação</h4>
         <input id="inputNomeAbreviatura" placeholder="Abreviatura">
         </div>

         </div>

         <div id="divDescricao">
         <h4 id="h4Descricao" data-value="descricao">Descrição</h4>
       <input id="inputAreaDescricao" placeholder="Descrição">
         </div>
         <div id="divPrecoVendaFornecedor">

         <div id="divInputCusto">
        <h4 id="h4Custo" data-value="custo">Custo</h4>
        <input id="inputCusto" placeholder="Custo">
         </div>

         <div id="divInputVenda">
        <h4 id="h4Venda" data-value="venda">Venda</h4>
        <input id="inputVenda" placeholder="Venda">         
         </div>

         <div id="divInputFornecedor">
        <h4 id="h4Fornecedor" data-value="fornecedor_id">Fornecedor</h4>
                    <select id="selectFornecedor">  
            <option disabled selected>--Selecione um fornecedor--</option>
            </select>
         </div>

        <div id="divInputTipoMaquinaMaquina">
        <h4 id="h4TipoMaquina" data-value="tipo_maquina_id">Tipo máquina</h4>
            <select id="selectTipoMaquinaMaquina">  
            <option disabled selected>--Selecione um tipo máquina--</option>
            </select>
         </div>
         </div>
            <div id="divButtonCadastroProduto">
          <button id="ButtonCadastroProduto">+ Cadastro</button>
          </div>

        </div>
        </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 7) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 7) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "produto",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };

            console.log(objPesquisa);

            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });

        const dadosFornecedor = await receber("nome", "fornecedor");
        const fornecedorSelect = document.getElementById("selectFornecedor");
        dadosFornecedor.forEach((fornecedores) => {
          fornecedorSelect.innerHTML += `<option>${fornecedores.nome}</option>`;
        });

        const dadosTipoMaquina = await receber("nome", "tipo_maquina");
        const inputTipoMaquina = document.getElementById(
          "selectTipoMaquinaMaquina"
        );
        dadosTipoMaquina.forEach((tipoMaquina) => {
          inputTipoMaquina.innerHTML += `<option>${tipoMaquina.nome}</option>`;
        });

        document
          .getElementById("ButtonCadastroProduto")
          .addEventListener("click", async () => {
            const nomeProduto =
              document.getElementById("inputNomeProduto").value;
            const abreviatura = document.getElementById(
              "inputNomeAbreviatura"
            ).value;
            const descricao =
              document.getElementById("inputAreaDescricao").value;
            const custo = document.getElementById("inputCusto").value;
            const venda = document.getElementById("inputVenda").value;
            const fornecedor =
              document.getElementById("selectFornecedor").value;
            const tipoMaquina = document.getElementById(
              "selectTipoMaquinaMaquina"
            ).value;
            //4
            const tipo_maquina_envio = await pesquisaInput(
              "id",
              "tipo_maquina",
              "nome",
              tipoMaquina
            );
            const tipo_maquina_id = tipo_maquina_envio[0].id;

            const fornecedor_envio = await pesquisaInput(
              "id",
              "fornecedor",
              "nome",
              fornecedor
            );
            const fornecedor_id = fornecedor_envio[0].id;

            const objProduto = {
              nome: nomeProduto,
              abreviatura: abreviatura,
              descricao: descricao,
              custo: custo,
              venda: venda,
              fornecedor: fornecedor,
              tipoMaquina: tipoMaquina,
            };
            if (
              nomeProduto == "" ||
              abreviatura == "" ||
              descricao == "" ||
              custo == "" ||
              venda == "" ||
              fornecedor_id == "" ||
              tipo_maquina_id == ""
            ) {
              alert("Preencha todos os campos");
            } else {
              try {
                let env2 = await envio(
                  "http://localhost:3000/cadastro/produto",
                  objProduto
                );
                if (env2 == 0) {
                  alert(`${nomeProduto} cadastrado com sucesso`);
                } else if (env2 == 1) {
                  alert(`${nomeProduto} ja cadastrado`);
                } else {
                  alert("Error");
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
      });

      loja.addEventListener("click", async () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML += `
        <div id="tela_branca">
         <div id="topo_telaBranca">
         Loja
         <hr id="hrLoja">
         </div>  
        <div id="divLojaResp">        

        <div id="divInputNomeLoja">
        <h4 id = "h4NomeLoja" data-value = "nome">Nome loja</h4>
        <input id="inputNomeLoja" placeholder="Nome loja">
        </div>

        <div id="divInputNomeResp">
        <h4 id = "h4NomeResp" data-value = "nome_responsavel">Nome responsável</h4>
        <input id="inputNomeResp" placeholder="Nome responsável">
        </div>

        </div>

         <div id="divRedeLojaSequência">

            <div id="divInputNumeroLoja">
            <h4 id="h4Rede" data-value = "rede">Rede</h4>
            <select id="selectRedeLoja" placeholder="Rede">
            <option disabled selected>--Selecione uma rede--</option>
            </select>
            </div>

            <div id="divSelectRede">
            <h4 id="h4nLoja" data-value = "numero_loja">Número da loja</h4>
            <input id="inputNumeroLoja" placeholder="numeroLoja">
            </div>

            <div id="divSelectSeq">
            <h4 id="h4Seq" data-value="sequencia">Sequência</h4>
            <input id="inputSequenciaLoja" placeholder="Sequência loja">
            </div>
         </div> 
        

        <div id="locacaoValorFixo">

        <div id="divRadiosLoc">
        <h3 id="h4Locacao" data-value="locacao">Locação</h3>
          <div id="divInputRadiosLocCom">     

              <div id="inputRadioFixo">
              <input id="radioFixo" type="radio" name="fixo">
              <h4 id="h4Fixo" data-value="locacao_fixo">Fixo</h4>
              </div>
              
              <div id="inputRaidoComissao">
              <input id="radioComissao" type="radio" name="comissao">
              <h4 id="h4Comissao" data-value="locacao_comissao">Comissão</h4>              
              </div>

          </div>
        </div>

        <div id="divInputValor">
        <h4 id="h4valor" data-value="valor">Valor</h4>
        <input id="inputValor" placeholder="Valor">
        </div>

        </div>

        <div id="emailTelWhat">

        <div id="divInputEmailLoja">
        <h4 id="h4Email" data-value="email">Email</h4>
        <input id="inputEmailLoja" placeholder="Email">
        </div>

        <div id="divInputTel">
        <h4 id="h4Tel" data-value="telefone">Telefone</h4>
        <input id="inputTel" placeholder="Telefone">
        </div>

        <div id="divInputWhat">
        <h4 id="h4What" data-value="whatsapp">Whatsapp</h4>
        <input id="inputWhat" placeholder="Whatsapp">
        </div>

        </div>

        <div id="divRotaCep">

        <div id="divInputRotaLoja">
        <h4 id="h4RotaLoja" data-value="rota">Rota</h4>

        <select id="inputRotaLoja">
        <option  disabled selected>--Selecione a rede--</option>
        </select>
        </div>

        <div id="divInputCepLoja">
        <h4 id="h4CEPLoja" data-value="cep">CEP</h4> 
        <input id="inputCEPLoja" placeholder="Rota">

        </div>

        </div>

        <div id="enderecoNumeroComp">

        <div id="divEndereco">
        <h4 id="h4DivEndereco" data-value="endereco">Endereço</h4>
        <div>
        <input id="inputEnderecoLoja" placeholder="Endereço">
        </div>
        </div>

        <div id="divComplemento">
        <h4 id="h4Complemento" data-value="complemento">Complemento</h4>
        <div>
        <input id="inputComplemento" placeholder="Complemento">
        </div>
        </div>

        <div id="divNumero">
        <h4 id="h4Numero" data-value="numero">Número</h4>
        <div>
        <input id="inputNumero" placeholder="Número">
        </div>
        </div>

        </div>

        <div id="bairroCidadeEstado">

        <div id="divBairro">
        <h4 id="h4DivBairro" data-value="bairro">Bairro</h4>
        <div>
        <input id="inputBairro" placeholder="Bairro">
        </div>
        </div>

        <div id="divCidade">
        <h4 id="h4Cidade" data-value="cidade">Cidade</h4>
        <div>
        <input id="inputCidade" placeholder="Cidade">
        </div>
        </div>

        <div id="divEstado">
        <h4 id="h4Estado" data-value="estado">Estado</h4>
        <div>
        <input id="inputEstado" placeholder="Estado">
        </div>
        </div>

        </div>
        <div id="divButtonCadastroLoja">
        <button id="ButtonCadastroLoja">+Cadastro</button>
        </div>

        </div>


      
        </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 18) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 18) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "loja",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };

            console.log(objPesquisa);

            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });

        //341

        const inputRedeLoja = document.getElementById("selectRedeLoja");
        const rota = document.getElementById("inputRotaLoja");
        const dadosRedeLoja = await receber("nome", "rede");

        dadosRedeLoja.forEach((dados) => {
          inputRedeLoja.innerHTML += `<option>${dados.nome}</option>`;
        });

        inputRedeLoja.addEventListener("change", async () => {
          const rede = document.getElementById("selectRedeLoja").value;
          const dadosRotaLoja = await pesquisaInput(
            "nome",
            "rota",
            "rede",
            rede
          );
          console.log(dadosRotaLoja);
          rota.innerHTML = `<option  disabled selected>--Selecione a rede--</option>`;
          dadosRotaLoja.forEach((dados2) => {
            rota.innerHTML += `<option>${dados2.nome}</option>`;
          });
        });

        document
          .getElementById("ButtonCadastroLoja")
          .addEventListener("click", async () => {
            const rede = document.getElementById("selectRedeLoja").value;
            const numeroLoja = document.getElementById("inputNumeroLoja").value;
            const sequencia =
              document.getElementById("inputSequenciaLoja").value;
            const nomeLoja = document.getElementById("inputNomeLoja").value;
            const nomeResp = document.getElementById("inputNomeResp").value;
            const locacaoFixo = document.getElementById("radioFixo").checked;
            const locacaoComissao =
              document.getElementById("radioComissao").checked;
            const valor = document.getElementById("inputValor").value;
            const email = document.getElementById("inputEmailLoja").value;
            const telefone = document.getElementById("inputTel").value;
            const whatsapp = document.getElementById("inputWhat").value;
            const rota = document.getElementById("inputRotaLoja").value;
            const cep = document.getElementById("inputCEPLoja").value;
            const endereco = document.getElementById("inputEnderecoLoja").value;
            const complemento =
              document.getElementById("inputComplemento").value;
            const numero = document.getElementById("inputNumero").value;
            const bairro = document.getElementById("inputBairro").value;
            const cidade = document.getElementById("inputCidade").value;
            const estado = document.getElementById("inputEstado").value;

            if (
              rede == "--Selecione uma rede" ||
              !numeroLoja ||
              !sequencia ||
              !nomeLoja ||
              !nomeResp ||
              (!locacaoFixo && !locacaoComissao) ||
              !valor ||
              !email ||
              !telefone ||
              !whatsapp ||
              rota =="--Selecione a rede--" ||
              !cep ||
              !endereco ||
              !numero ||
              !bairro ||
              !cidade ||
              !estado
            ) {
              alert("Preencha todos os campos obrigatórios.");
            } else {
              const lojaobj = {
                rede,
                numeroLoja,
                sequencia,
                nomeLoja,
                nomeResp,
                locacaoFixo,
                locacaoComissao,
                valor,
                email,
                telefone,
                whatsapp,
                rota,
                cep,
                endereco,
                complemento,
                numero,
                bairro,
                cidade,
                estado,
              };

              try {
                let env2 = await envio(
                  "http://localhost:3000/cadastro/loja",
                  lojaobj
                );
                if (env2 == 0) {
                  alert(`${nomeLoja} cadastrada com sucesso`);
                } else if (env2 == 1) {
                  alert(`${nomeLoja} já está cadastrada`);
                } else {
                  alert("Erro ao cadastrar loja.");
                }
              } catch (error) {
                console.log("Erro no envio:", error);
                alert("Erro inesperado. Veja o console.");
              }
            }
          });
      });

      // tipoMaquina.addEventListener("click", () => {
      //   tela_cadastro.innerHTML = " ";
      //   tela_cadastro.innerHTML = '<div id="tela_branca"></div>';
      // });

      maquina.addEventListener("click", async () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `
        <div id="tela_branca">
        <div id="topo_telaBranca">
         Máquina
         <hr id="hrMaquina">
         </div>
         <div id="divNomeMaquinaDescricao">

        <div id="divInputNomeMaquina">
          <h4 id="h4NomeMaquina" data-value="nome">Nome máquina</h4>
          <input id="inputNomeMaquina" placeholder="Nome máquina">
        </div>

        <div id="divInputDescricao">
          <h4 id="h4DescricaoMaquina" data-value="descricao">Descrição</h4>
          <input id="inputDescricao" placeholder="Descrição">
        </div>
         </div>
        <div id="DivInputTamanhoFormatoCorQuantidade">

          <div id="divInputTamanho">
          <h4 id="h4Tamanho" data-value="tamanho">Tamanho</h4>
          <select id="selectTamanhoMaquina">  
          <option disabled selected>--Selecione um tamanho--</option>
          </select>
          </div>

          <div id="divInputFormato">
          <h4 id="h4Formato" data-value="formato">Formato</h4>
          <select id="selectFormato">  
          <option disabled selected>--Selecione um formato--</option>
          </select>
          </div>

          <div id="divInputCor">
          <h4 id="h4Cor" data-value="cor">Cor</h4>
          <select id="selectCor">  
          <option disabled selected>--Selecione uma cor--</option>
          </select>
          </div>

          <div id="divInputQuantidade">
          <h4 id="h4Quantidade" data-value="quantidade">Quantidade</h4>
          <input id="inputQuantidade" placeholder="Quantidade">  
          </div>
        </div>      


     <div id="DivInputChaveCofreMaquinaFabricanteTipo">

  <div id="divInputChaveCofre">
    <h4 id="h4ChaveCofre" data-value="chave_cofre">Chave Cofre</h4>
    <input id="inputChaveCofre" placeholder="Chave Cofre">  
  </div>

  <div id="divInputChaveMaquina">
    <h4 id="h4ChaveMaquina" data-value="chave_maquina">Chave Máquina</h4>
    <input id="inputChaveMaquina" placeholder="Chave Máquina">  
  </div>

  <div id="divInputFabricante">
    <h4 id="h4Fabricante" data-value="fabricante">Fabricante</h4>
    <input id="inputFabricante" placeholder="Fabricante">  
  </div>

  <div id="divInputTipoMaquina">
    <h4 id="h4TMaquina" data-value="tipo_maquina">Tipo de Máquina</h4>
    <select id="selectTipoMaquina">  
    <option disabled selected>--Selecione um tipo máquina--</option>
    </select>
  </div>

</div>
     <div id="divButtonCadastroMaquina">
     <button id="buttonCadastroMaquina">+Cadastro</button>
     </div>
      </div>

      </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 10) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 10) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "maquina",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };


            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });

        

        const inputFormato = document.getElementById("selectFormato");
        const inputCor = document.getElementById("selectCor");
        const inputTipoMaquina = document.getElementById("selectTipoMaquina");
        const inputTamanho = document.getElementById("selectTamanhoMaquina");

        const dadosFormato = await receber("nome", "formato");
        const dadosCor = await receber("nome", "cor");
        const dadosTipoMaquina = await receber("nome", "tipo_maquina");
        const dadosTamanho = await receber("nome", "tamanho");

        dadosFormato.forEach((dados) => {
          inputFormato.innerHTML += `<option>${dados.nome}</option>`;
        });
        dadosCor.forEach((dados) => {
          inputCor.innerHTML += `<option>${dados.nome}</option>`;
        });
        dadosTipoMaquina.forEach((dados) => {
          inputTipoMaquina.innerHTML += `<option>${dados.nome}</option>`;
        });

        dadosTamanho.forEach((dados) => {
          inputTamanho.innerHTML += `<option>${dados.nome}</option>`;
        });

        document
          .getElementById("buttonCadastroMaquina")
          .addEventListener("click", async () => {
            const nomeMaquina =
              document.getElementById("inputNomeMaquina").value;
            const descricao = document.getElementById("inputDescricao").value;
            const tamanho = document.getElementById(
              "selectTamanhoMaquina"
            ).value;
            const formato = document.getElementById("selectFormato").value;
            const cor = document.getElementById("selectCor").value;
            const quantidade = document.getElementById("inputQuantidade").value;
            const chaveCofre = document.getElementById("inputChaveCofre").value;
            const chaveMaquina =
              document.getElementById("inputChaveMaquina").value;
            const fabricante = document.getElementById("inputFabricante").value;
            const tipoMaquina =
              document.getElementById("selectTipoMaquina").value;

            if (
              !nomeMaquina ||
              !descricao ||
              tamanho == "--Selecione um tamanho" ||
              formato == "--Selecione um formato--" ||
              cor == "--Selecione uma cor--" ||
              !quantidade ||
              !chaveCofre ||
              !chaveMaquina ||
              !fabricante ||
              tipoMaquina == "--Selecione um tipo máquina--"
            ) {
              alert("Preencha todos os campos");
            } else {
              const codTamanho = await pesquisaInput(
                "id",
                "tamanho",
                "nome",
                tamanho
              );
              const codTamanhoId = codTamanho[0].id;

              const codCor = await pesquisaInput("id", "cor", "nome", cor);
              const codCorId = codCor[0].id;

              const codFormato = await pesquisaInput(
                "id",
                "formato",
                "nome",
                formato
              );
              const codFormatoId = codFormato[0].id;

              const codTipoMaquina = await pesquisaInput(
                "id",
                "tipo_maquina",
                "nome",
                tipoMaquina
              );
              const codTipoMaquinaId = codTipoMaquina[0].id;

              const maquinaObj = {
                nome: nomeMaquina,
                descricao: descricao,
                tamanho: tamanho,
                formato: formato,
                cor: cor,
                quantidade: quantidade,
                chave_cofre: chaveCofre,
                chave_maquina: chaveMaquina,
                fabricante: fabricante,
                tipo_maquina: tipoMaquina,
              };

              try {
                let env2 = await envio(
                  "http://localhost:3000/cadastro/maquina",
                  maquinaObj
                );
                if (env2 == 0) {
                  alert(`${nomeMaquina} cadastrada com sucesso`);
                } else if (env2 == 1) {
                  alert(`${nomeMaquina} já está cadastrada`);
                } else {
                  alert("Erro ao cadastrar loja.");
                }
              } catch (error) {
                console.log("Erro no envio:", error);
                alert("Erro inesperado. Veja o console.");
              }
            }
          });
      });
      // Atributos

      atributo.addEventListener("click", () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `
        <div id="tela_branca">
         <div id="topo_telaBranca">
          Atributos
         <hr id="hrAtributo">
         </div>

        <div id="divAtributos">
          <div id="divCadastroTamanhoFormato">
            <div id="divCadastroTamanho">
              <div id="divInputCadastroTamanho">
              <h4>Tamanho</h4>
              <input id="inputCadastroTamanho" placeholder="Tamanho">
              </div>
              <button id="btnCadastroTamanho">Cadastro+</button>
            </div>
              

            <div id="divCadastroFormato">
              <div id="divInputCadastroFormato">
              <h4>Formato</h4>
              <input id="inputCadastroFormato" placeholder="Formato">
              </div>
              <button id="btnCadastroFormato">Cadastro+</button>
            </div>
          </div>

          <div id="divCadastroCorTipoMaquina">
            <div id="divCadastroCor">
              <div id="divInputCadastroCor">
              <h4>Cor</h4>
              <input id="inputCadastroCor" placeholder="Cor">
              </div>
              <button id="btnCadastroCor">Cadastro+</button>
            </div>
              

            <div id="divCadastroTipoMaquina">
              <div id="divInputCadastroTipoMaquina">
              <h4>Tipo máquina</h4>
              <input id="inputCadastroTipoMaquina" placeholder="Tipo máquina">
              </div>
              <button id="btnCadastroTipoMaquina">Cadastro+</button>
            </div>
          </div>

          <div id="divCadastroRedeAtributo">
            <div id="divCadastroRede">
              <div id="divInputCadastroRede">
              <h4>Rede</h4>
              <input id="inputCadastroRede" placeholder="Rede">
              </div>
              <button id="btnCadastroRede">Cadastro+</button>
            </div>
          </div>

        </div>

        </div>
        `;
        document
          .getElementById("btnCadastroTamanho")
          .addEventListener("click", async () => {
            const tamanho = document.getElementById(
              "inputCadastroTamanho"
            ).value;
            const onde = "tamanho";
            if (!tamanho) {
              alert("Preencha o campo");
            } else {
              try {
                const url = "http://localhost:3000/cadastro/atributo";
                const teste = { valor: tamanho, onde: onde };
                const env3 = await envio(url, teste);
                if (env3 == 1) {
                  alert(`${tamanho} ja cadastrado`);
                } else if (env3 == 0) {
                  alert(`${tamanho} cadastrado com sucesso`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });

        document
          .getElementById("btnCadastroFormato")
          .addEventListener("click", async () => {
            const formato = document.getElementById(
              "inputCadastroFormato"
            ).value;
            const onde = "formato";
            if (!formato) {
              alert("Preencha o campo");
            } else {
              try {
                const url = "http://localhost:3000/cadastro/atributo";
                const teste = { valor: formato, onde: onde };

                const env4 = await envio(url, teste);

                if (env4 == 1) {
                  alert(`${formato} ja cadastrado`);
                } else if (env4 == 0) {
                  alert(`${formato} cadastrado com sucesso`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });

        document
          .getElementById("btnCadastroCor")
          .addEventListener("click", async () => {
            const cor = document.getElementById("inputCadastroCor").value;
            const onde = "cor";
            if (!cor) {
              alert("Preencha o campo");
            } else {
              try {
                const url = "http://localhost:3000/cadastro/atributo";
                const teste = { valor: cor, onde: onde };

                const env5 = await envio(url, teste);

                if (env5 == 1) {
                  alert(`${cor} ja cadastrado`);
                } else if (env5 == 0) {
                  alert(`${cor} cadastrado com sucesso`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });

        document
          .getElementById("btnCadastroTipoMaquina")
          .addEventListener("click", async () => {
            const tipoMaquina = document.getElementById(
              "inputCadastroTipoMaquina"
            ).value;
            const onde = "tipo_maquina";
            if (!tipoMaquina) {
              alert("Preencha o campo");
            } else {
              try {
                const url = "http://localhost:3000/cadastro/atributo";
                const teste = { valor: tipoMaquina, onde: onde };

                const env5 = await envio(url, teste);

                if (env5 == 1) {
                  alert(`${tipoMaquina} ja cadastrado`);
                } else if (env5 == 0) {
                  alert(`${tipoMaquina} cadastrado com sucesso`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });

        document
          .getElementById("btnCadastroRede")
          .addEventListener("click", async () => {
            const rede = document.getElementById("inputCadastroRede").value;
            const onde = "rede";
            if (!rede) {
              alert("Preencha o campo");
            } else {
              try {
                const url = "http://localhost:3000/cadastro/atributo";
                const teste = { valor: rede, onde: onde };

                const env6 = await envio(url, teste);

                if (env6 == 1) {
                  alert(`${rede} ja cadastrado`);
                } else if (env6 == 0) {
                  alert(`${rede} cadastrado com sucesso`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
      });

      rack.addEventListener("click", async () => {
        tela_cadastro.innerHTML = " ";
        tela_cadastro.innerHTML = `
          <div id="tela_branca">
         <div id="topo_telaBranca">
          Rack
         <hr id="hrRack">
         </div>

          <div id="divCadastroRack">
            <div id="divInputNomeMedidasCor">

            <div id = "divInputRackNome">
            <h4 id="h4RackNome" data-value="nome">Nome</h4>
            <input id="inputRackNome" placecolder = "Nome">            
            </div>

            <div id = "divInputRackMedidas">
            <h4 id="h4RackMedidas" data-value="medidas">Medidas</h4>
            <input id="inputRackMedidas" placecolder = "Medidas">          
            </div>
            
            <div id = "divSelectRackCor">
            <h4 id="h4RackCor" data-value="cor">Cor</h4>
            <select id="selectRackCor">  
            <option disabled selected>--Selecione uma cor--</option>
            </select>
            </div>            

            </div>
            <div id="divBtnCadastroRack">
            <button id="btnCadastroRack">Cadastro+</button>
            </div>
          </div>

          </div>
        <div id="tela_branca_pesquisa">
        <div>
        <h3>Campos</h3>
        </div>
        <hr id = "linhaDivisoriaPesquisa">
        <div id="divParametrosMostrar">
          <button id="btnAdicionarCampoMostrar">+</button>

        </div>
        <div>
        <h3>Onde</h3>
        
        </div>
        <hr id = "linhaDivisoriaPesquisa">

        <div id="divParametrosBusca">
        
          <button id="btnAdicionarCampoBusca">+</button>
       
        </div>

        <hr id = "linhaDivisoriaPesquisa">

        <div id ="divButtonPesquisar">
        <button id="buttonPesquisar">Pesquisar</button>
        </div>
        </div>
        <div id="telaResultadoPesquisa">

        </div>
        `;
        let qtd = 0;
        const divParametroMostrar = document.getElementById(
          "divParametrosMostrar"
        );
        const btnParametroMostrar = document.getElementById(
          "btnAdicionarCampoMostrar"
        );
        const divTelaResultado = document.getElementById(
          "telaResultadoPesquisa"
        );

        btnParametroMostrar.addEventListener("click", () => {
          const campoMostrar = document.createElement("div");
          campoMostrar.id = "campoMostrar";

          const btnRemoverMostrar = document.createElement("button");
          btnRemoverMostrar.textContent = "X";
          btnRemoverMostrar.id = "btnRemoverMostrar";

          const selectCampoMostrar = document.createElement("select");
          selectCampoMostrar.id = "selectCampoMostrar";
          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoMostrar.appendChild(option);
          });

          campoMostrar.appendChild(selectCampoMostrar);
          campoMostrar.appendChild(btnRemoverMostrar);
          // Evento para remover o campo inteiro
          btnRemoverMostrar.addEventListener("click", () => {
            campoMostrar.remove();
            qtd--;
          });

          if (qtd < 3) {
            qtd++;
            divParametroMostrar.insertBefore(campoMostrar, btnParametroMostrar);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        let qtd2 = 0;
        const divParametrosBusca =
          document.getElementById("divParametrosBusca");
        const btnParametroBusca = document.getElementById(
          "btnAdicionarCampoBusca"
        );
        const tabela_res = document.createElement("table");
        tabela_res.id = "tabela_res";

        btnParametroBusca.addEventListener("click", async () => {
          const campoBusca = document.createElement("div");
          campoBusca.id = "campoBusca";

          const selectCampoBusca = document.createElement("select");
          selectCampoBusca.id = "selectCampoBusca";

          const btnRemoverBuscar = document.createElement("button");
          btnRemoverBuscar.textContent = "X";
          btnRemoverBuscar.id = "btnRemoverBuscar";

          const inputCampoBusca = document.createElement("input");
          inputCampoBusca.id = "inputselectCampoBusca";

          const campos = document.querySelectorAll("h4");

          campos.forEach((campo) => {
            const option = document.createElement("option");
            option.value = campo.dataset.value;
            const label = campo.textContent || "Sem nome";
            option.textContent = label;

            selectCampoBusca.appendChild(option);
          });
          const divControle = document.createElement("div");
          divControle.id = "divControle";
          divControle.appendChild(selectCampoBusca);
          divControle.appendChild(btnRemoverBuscar);

          campoBusca.appendChild(divControle);
          campoBusca.appendChild(inputCampoBusca);

            btnRemoverBuscar.addEventListener("click", () => {
            campoBusca.remove();
            qtd2--;
          });
          if (qtd2 < 3) {
            qtd2++;
            divParametrosBusca.insertBefore(campoBusca, btnParametroBusca);
          } else {
            alert("Quantidade máxima de parametros atingida");
          }
        });

        document
          .getElementById("buttonPesquisar")
          .addEventListener("click", async () => {
            // Limpa o container de resultados antes de adicionar uma nova tabela
            divTelaResultado.replaceChildren();

            // Cria a tabela nova
            const tabela_res = document.createElement("table");
            tabela_res.border = "1";

            // Pega selects do parâmetro mostrar
            const parametros = divParametroMostrar.querySelectorAll("select");
            const parametrosSelect = Array.from(parametros).map((p) => p.value);

            // Pega selects do campo de busca
            const nomeCampo = divParametrosBusca.querySelectorAll("select");
            const nomeCampoSelect = Array.from(nomeCampo).map((nc) => nc.value);

            // Pega valores dos inputs
            const valorCampo = divParametrosBusca.querySelectorAll("input");
            const valorCampoSelect = Array.from(valorCampo).map((v) => v.value);

            // Monta objeto para envio
            const objPesquisa = {
              onde: "rack",
              valor1: parametrosSelect,
              valor2: nomeCampoSelect,
              valor3: valorCampoSelect,
            };


            try {
              const pesq = await envio(
                "http://localhost:3000/pesquisa/campos/bd",
                objPesquisa
              );

              // Arrays para o head e body
              let camposHead = [];
              let camposBody = [];

              // Processa os dados retornados
              pesq.forEach((linha) => {
                Object.entries(linha).forEach(([campo, valor]) => {
                  if (!camposHead.includes(campo)) camposHead.push(campo);
                  camposBody.push(valor);
                });
              });

              let tamanhoHead = camposHead.length;
              console.log(camposBody, camposHead, tamanhoHead);

              // Monta o cabeçalho da tabela
              const trHead = document.createElement("tr");
              camposHead.forEach((campo) => {
                const th = document.createElement("th");
                th.textContent = campo;
                trHead.appendChild(th);
              });
              tabela_res.appendChild(trHead);

              // Monta o corpo da tabela
              let contador = 0;
              let trAtual = document.createElement("tr");

              camposBody.forEach((dadosBody) => {
                const novaTd = document.createElement("td");
                novaTd.textContent = dadosBody;
                trAtual.appendChild(novaTd);
                contador++;

                if (contador % tamanhoHead === 0) {
                  tabela_res.appendChild(trAtual);
                  trAtual = document.createElement("tr");
                }
              });

              // Se sobraram células incompletas no final
              if (trAtual.children.length > 0) {
                tabela_res.appendChild(trAtual);
              }

              // Adiciona a tabela pronta ao div de resultados
              divTelaResultado.appendChild(tabela_res);
            } catch (error) {
              console.log(error);
            }
          });

        
        const inputCorRack = document.getElementById("selectRackCor");
        const dadosCor = await receber("nome", "cor");
        dadosCor.forEach((dados) => {
          inputCorRack.innerHTML += `<option>${dados.nome}</option>`;
        });

        document
          .getElementById("btnCadastroRack")
          .addEventListener("click", async () => {
            const nome = document.getElementById("inputRackNome").value;
            const medidas = document.getElementById("inputRackMedidas").value;
            const cor = document.getElementById("selectRackCor").value;

            if ((!nome, !medidas, cor == "--Selecione uma cor--")) {
              alert("Preencha todos os campos");
            } else {
              try {
                const codCorRack = await pesquisaInput(
                  "id",
                  "cor",
                  "nome",
                  cor
                );
                const codCorIdRack = codCorRack[0].id;

                const objRack = {
                  nome: nome,
                  medidas: medidas,
                  cor: cor,
                };

                const env7 = await envio(
                  "http://localhost:3000/cadastro/rack",
                  objRack
                );

                if (env7 == 1) {
                  alert(`${nome} ja cadastrado`);
                } else if (env7 == 0) {
                  alert(`${nome} cadastrado com sucesso`);
                } else {
                  alert(`Erro`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
      });
    });
  });

  menu.addEventListener("mouseleave", () => {
    cadastros.classList = "classProduto_fechado";
    menu.classList = "menuFechado";
    btn_menu_seta.classList = "btn_img_menu_seta_fechar";
    menu.style.width = "4%";
    texto_produto.classList = "texto_sumir";
    cadastros.innerHTML = " ";
  });
});
