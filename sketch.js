// Lista de filmes e suas informações
const filmesDB = [
  ["A viagem de chihiro", 0, "aventura"],
  ["Paddington", 0, "fantasia"],
  ["Contato", 0, "ficção científica"],
  ["Milagre na rua 34", 0, "drama"],
  ["Red: Crescer é uma fera", 0, "fantasia"],
  ["As aventuras de pi", 10, "aventura"],
  ["Onde vivem os monstros", 10, "fantasia"],
  ["Os caça fantasmas", 10, "ficção científica"],
  ["Depois da chuva", 10, "drama"],
  ["Guardiões da galáxia", 12, "fantasia", "aventura"],
  ["Ladrões de bicicleta", 12, "drama"],
  ["Interestelar", 12, "ficção científica"],
  ["O menino que descobriu o vento", 14, "drama"],
  ["O Senhor dos Anéis", 14, "fantasia"],
  ["Stargate", 14, "ficção científica"],  
];

// Variáveis para armazenar a recomendação e as preferências do usuário
let recomendacao = "";
let ultimaRecomendacao = {
  idade: 0,
  gostaDeFantasia: false,
  gostaDeAventura: false,
  gostaDeDrama: false,
  gostaDeFiccao: false
};

function setup() {
  createCanvas(800, 400);
  createElement("h2", "Recomendador de filmes");

  // Criação dos elementos de entrada
  createElement("p", "Sua idade:");
  campoIdade = createInput("5");
  campoFantasia = createCheckbox("Gosta de filmes de fantasia?");
  campoAventura = createCheckbox("Gosta de filmes de aventura?");
  campoDrama = createCheckbox("Gosta de filmes de drama?");
  campoFiccao = createCheckbox("Gosta de filmes de ficção científica?");
}

function draw() {
  background("white");

  // Obtenção das preferências do usuário
  const idade = parseInt(campoIdade.value());
  const gostaDeFantasia = campoFantasia.checked();
  const gostaDeAventura = campoAventura.checked();
  const gostaDeDrama = campoDrama.checked();
  const gostaDeFiccao = campoFiccao.checked();

  // Gera uma nova recomendação apenas quando as preferências mudarem
  if (
    idade !== ultimaRecomendacao.idade ||
    gostaDeFantasia !== ultimaRecomendacao.gostaDeFantasia ||
    gostaDeAventura !== ultimaRecomendacao.gostaDeAventura ||
    gostaDeDrama !== ultimaRecomendacao.gostaDeDrama ||
    gostaDeFiccao !== ultimaRecomendacao.gostaDeFiccao
  ) {
    recomendacao = geraRecomendacao(idade, gostaDeFantasia, gostaDeAventura, gostaDeDrama, gostaDeFiccao);
    ultimaRecomendacao = {
      idade,
      gostaDeFantasia,
      gostaDeAventura,
      gostaDeDrama,
      gostaDeFiccao
    };
  }

  // Exibição da recomendação
  fill(color(76, 0, 115));
  textAlign(CENTER, CENTER);
  textSize(28);
  text(recomendacao, width / 2, height / 2);
}

function geraRecomendacao(idade, gostaDeFantasia, gostaDeAventura, gostaDeDrama, gostaDeFiccao) {
  // Filtra os filmes de acordo com as preferências do usuário
  const recomendacoes = filmesDB.filter(filme => {
    return (
      idade >= filme[1] &&
      (
        (gostaDeFantasia && filme.includes("fantasia")) ||
        (gostaDeAventura && filme.includes("aventura")) ||
        (gostaDeDrama && filme.includes("drama")) ||
        (gostaDeFiccao && filme.includes("ficção científica")) ||
        (!gostaDeFantasia && !gostaDeAventura && !gostaDeDrama && !gostaDeFiccao && !filme.includes("fantasia") && !filme.includes("aventura") && !filme.includes("drama") && !filme.includes("ficção científica"))
      )
    );
  });

  // Retorna uma recomendação aleatória da lista filtrada, ou uma mensagem de aviso se não houver recomendações
  if (recomendacoes.length > 0) {
    return recomendacoes[Math.floor(Math.random() * recomendacoes.length)][0];
  } else {
    return "Desculpe, não encontramos uma recomendação adequada.";
  }
}
