//biblioteca para manipulação de arquivos
var fs = require('fs');
//biblioteca para funcoes de conjuntos
var _ = require('underscore');

var afnd = fs.readFileSync('./automato.afnd', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  afnd = data;
});

var parseAFND = function(afnd) {
  //Separar pelas linhas
  afnd = afnd.split('\n');
  //Parsing das definições do autômato que não são transições
  var tmpAfnd = [];
  var param;
  for (var index = 0; index < 4; index++) {
    param = afnd[index].split(':');
    tmpAfnd[tmpAfnd.length] = {
      "parametro": param[0],
      "valor": param[1]
    };
  }

  //Parsing das transições
  var transicoes = [];
  var transicao;

  for (var index = 5; index < afnd.length; index++) {
    transicao = afnd[index];
    transicao = transicao.split('->');

    var origESimbol = transicao[0].split('/');

    transicao[0] = origESimbol;
    //Removendo as chaves
    transicao[1] = transicao[1].replace('{', '');
    transicao[1] = transicao[1].replace('}', '');

    //Removendo os espaços em branco do inicio e do fim
    transicao[1] = transicao[1].trim();

    //Separando os estados
    transicao[1] = transicao[1].split(' ');

    for (var i = 0; i < transicao[1].length; i++) {
      transicao[1][i] = parseInt(transicao[1][i]);
    };

    //Criando o objeto modelo
    transicao = {
      "origem": parseInt(transicao[0][0]),
      "simbolo": transicao[0][1].trim(),
      "destinos": transicao[1]
    };

    //Adicionando à lista de transições
    transicoes[transicoes.length] = transicao;
  }

  //Convertendo os estados finais para int
  estadosFinais = tmpAfnd[3].valor.trim().split(' ');
  for (var i = 0; i < estadosFinais.length; i++) {
    estadosFinais[i] = parseInt(estadosFinais[i]);
  }

  afnd = {
    "alfabeto": tmpAfnd[0].valor.trim().split(' '),
    "numEstados": parseInt(tmpAfnd[1].valor.trim()),
    "estadoInicial": parseInt(tmpAfnd[2].valor.trim()),
    "estadosFinais": estadosFinais,
    "transicoes": transicoes
  };
  return afnd;
};

afnd = parseAFND(afnd);

function inserirTransicao(transicoesAFD, transicoesAFND) {
  for (var i = 0; i < transicoesAFND.length; i++) {}
  return transicoesAFD;
}

var construirAFD = function(afnd) {
  var afd;
  var transicoesAFND = afnd.transicoes;
  var transicoesAFD = [];
  //Preenche os estados possíveis para as transicoes do AFD
  transicoesAFD = inserirTransicao(transicoesAFD, transicoesAFND);

  return transicoesAFND;
};

function obterDestinosUnicos(transicoesAFND) {
  var destinosUnicos = [];
  for (var i = 0; i < transicoesAFND.length; i++) {
    var destinos = transicoesAFND[i].destinos;
    if (destinos.length > 1) {
      for (var j = 0; j < destinos.length; j++) {
        destinosUnicos[destinosUnicos.length] = destinos[j];
      }
    } else {
      destinosUnicos[destinosUnicos.length] = destinos[0];
    }
  }

  //Retorna os destinos ordenados 
  return _.uniq(destinosUnicos.sort());
}

//console.log(afnd);

function buscarDestino(transicoes, origem, simbolo) {
  for (var i = 0; i < transicoes.length; i++) {
    //console.log('RecOrig: '+origem+' RecSim: '+simbolo+' CurrOrig: '+transicoes[i].origem+' CurrSim: '+transicoes[i].simbolo);
    if (transicoes[i].origem === origem &&
      transicoes[i].simbolo === simbolo) {
      return transicoes[i].destinos;
    }
  }
}

var transicoesAFD = _.without(obterDestinosUnicos(afnd.transicoes), NaN);
transicoesAFD = _.union(transicoesAFD, [0]).sort();
for (var i = 0; i < afnd.transicoes.length; i++) {
  //Verificar se o destino não existe em AFD
  if (!(afnd.transicoes[i].destinos in transicoesAFD)) {
    //Adiciona o destino na lista do AFD
    transicoesAFD[transicoesAFD.length] = afnd.transicoes[i].destinos;
  }
}

var transicoes = [];
for (var i = 0; i < transicoesAFD.length; i++) {
  for (var j = 0; j < afnd.alfabeto.length; j++) {
    var transicao = {
        origem: transicoesAFD[i],
        simbolo: afnd.alfabeto[j],
        destino: []
      };
    if (transicoesAFD[i].length > 1) {
      var destTmp = [];
      for (var k = 0; k < transicoesAFD[i].length; k++) {
        destTmp[destTmp.length] = buscarDestino(afnd.transicoes, transicoesAFD[k], afnd.alfabeto[j]);
      }
      transicao.destino = destTmp;
    } else {
      var defined = (typeof transicoesAFD[i][0] != 'undefined');
      var isnan = isNaN(transicoesAFD[i][0]);
      if(defined && isnan){
        transicao.destino = [''];
      }else{
        transicao.destino = buscarDestino(afnd.transicoes, transicoesAFD[i], afnd.alfabeto[j]);
      }
    }
    transicoes[transicoes.length] = transicao;
  }
}
console.log(_.without(transicoes);