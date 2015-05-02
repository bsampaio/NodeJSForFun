/// <reference path="../typings/node/node.d.ts"/>
if (!process.argv[2]) {
	console.log("Será necessária uma matriz de entrada terceiro argumento");
	process.exit();
}

if (!process.argv[3]) {
	console.log("Será necessário um termo de pesquisa como quarto argumento");
	process.exit();
}

var arch = require('./' + process.argv[2] + '.json');
var word = process.argv[3];

var getElement = function (array, linha, coluna) {
	if (linha < array.length) {
		if (coluna < array[linha].length)
			return array[linha][coluna];
	}
};

var searchDiagonal = function (array, flexas, word) {
	var linhaPos;
	var colPos;
	var tmpArray = [];
	
	//Verifica para cada flexa
	flexas.some(function (flexa, currIndex, flexas) {
		var wordIndex = 0;
		var l = flexa.linha;
		var c = flexa.coluna;

		while (array[l]) {
			if (array[l][c]) {
				//Representa o array do resultado
				tmpArray[tmpArray.length] = array[l][c];
				//Verificar se a letra bate e se o resultado foi obtido e retornar se for verdade
				if (array[l][c] === word[wordIndex]) {
					wordIndex++;
					//Verificando se a palavra foi buscada inteiramente
					if (wordIndex === word.length) {
						//Fazer as atribuições de busca (linha e coluna) do resultado
						linhaPos = l - (word.length - 1) +1;
						colPos = c - (word.length - 1) +1;
						return true;
					}
				}

				l++;
				c++;
			} else {
				break;
			}
		}
		tmpArray = [];
	});
	return {
		"linha": linhaPos,
		"coluna": colPos,
		"array": tmpArray
	};
};

var search = function (word, collection, collectionIndex) {
	var wordIndex = 0;
	var linhaPos;
	var colPos;

	collection.some(function (character, charIndex, array) {

		//Encontrando a palavra
		if (character === word[wordIndex]) {
			wordIndex++;
		} else {
			wordIndex = 0;
		}

		//Encontrando a collection
		if (wordIndex === word.length) {
			linhaPos = collectionIndex +1;
			colPos = (charIndex + 1) - (word.length - 1);
			//return true;
		}
	});
	return {
		"linha": linhaPos,
		"coluna": colPos
	};
};

//Criando a mesma matriz, porém vertical
var tmpCol = [];
var verticalMatrix = [];
for (var i = 0; i < arch.matrix.length; i++) {
	tmpCol = [];
	for (var j = 0; j < arch.matrix[i].length; j++) {
		//Percorre coluna por coluna
		tmpCol[tmpCol.length] = arch.matrix[j][i];
	}
	verticalMatrix[verticalMatrix.length] = tmpCol;
}


arch.matrix.some(function (linha, index, array) {
	var resultHorizontal = search(word,linha,index);

  	if(resultHorizontal.linha){
  		console.log('\n -- Busca Horizontal --');
  		console.log('Palavra \''+word+'\' encontrada na linha: '+resultHorizontal.linha+' coluna: '+resultHorizontal.coluna);
  		return true;
  	}
});

verticalMatrix.some(function (coluna, index, array){
	var resultVertical = search(word,coluna,index);

  	if(resultVertical.linha){
  		console.log('\n -- Busca Vertical --');
		//As propriedades linha e coluna são referentes à matriz invertida. Logo, podemos modificar na impressão
  		console.log('Palavra \''+word+'\' encontrada na linha: '+resultVertical.coluna+' coluna: '+resultVertical.linha);
  		return true;
  	}
});


// -- Operações para a obtenção das flexas --
var linMaxIndex = arch.matrix.length - 1;
var colMaxIndex = arch.matrix[0].length - 1;

var flexas = [];

//Obtendo as linhas da coluna 0
for (var i = arch.matrix.length - 1; i >= 0; i--) {
	if (flexas[flexas.length] !== arch.matrix[i][0])
		flexas[flexas.length] = {
			"linha": i,
			"coluna": 0
		};
}
//Obtendo as colunas da linha 0
for (var i = 1; i < arch.matrix.length; i++) {
	if (flexas[flexas.length] !== arch.matrix[0][i])
		flexas[flexas.length] = {
			"linha": 0,
			"coluna": i
		};
}

var resultDiagonal = searchDiagonal(arch.matrix, flexas, word);
if(resultDiagonal.linha){
	console.log('\n -- Busca Diagonal (Esquerda, Baixo) --');
	console.log('Palavra \''+word+'\' encontrada na linha: '+resultDiagonal.linha+' coluna: '+resultDiagonal.coluna);
}