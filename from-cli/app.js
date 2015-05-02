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

var getElement = function(array, linha, coluna) {
	if (linha < array.length) {
		if (coluna < array[linha].length)
			return array[linha][coluna];
	}
};

var searchDiagonal = function(array, flexas, word) {
	var wordIndex = 0;
	var linhaPos;
	var colPos;

	flexas.some(function(flexa, currIndex, flexas) {

		var l = flexa.linha;
		var c = flexa.coluna;

		while (array[l]) {
			if (array[l][c]) {
				//Verificar se a letra bate e se o resultado foi obtido e retornar se for verdade
				if (array[l][c] === word[wordIndex]) {
					wordIndex++;
					if (wordIndex === word.length - 1) {
						//Fazer as atribuições de busca (linha e coluna) do resultado
						linhaPos = l;
						colPos = c;
						return true;
					}
				}

				l++;
				c++;
			} else {
				break;
			}
		}
	});
	return {
		"linhaPos": linhaPos,
		"wordIndex": colPos
	};
};

var search = function(word, collection, collectionIndex) {
	var wordIndex = 0;
	var linhaPos;
	var colPos;

	collection.some(function(character, charIndex, array) {

		//Encontrando a palavra
		if (character === word[wordIndex]) {
			wordIndex++;
		} else {
			wordIndex = 0;
		}

		//Encontrando a collection
		if (wordIndex === word.length - 1) {
			linhaPos = collectionIndex + 1;
			colPos = charIndex + 1 - (word.length - 1) + 1;
			//return true;
		}
	});
	return {
		"linhaPos": linhaPos,
		"wordIndex": colPos
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

/*
arch.matrix.some(function (linha, index, array) {
	var resultHorizontal = search(word,linha,index);

  	if(resultHorizontal.linhaPos){
  		console.log('\n -- Busca Horizontal --');
  		console.log('Palavra \''+word+'\' encontrada na linha: '+resultHorizontal.linhaPos+' coluna: '+resultHorizontal.wordIndex);
  		//return true;
  	}
});

verticalMatrix.some(function (coluna, index, array){
	var resultVertical = search(word,coluna,index);

  	if(resultVertical.linhaPos){
  		console.log('\n -- Busca Vertical --');
  		console.log('Palavra \''+word+'\' encontrada na coluna: '+resultVertical.linhaPos+' linha: '+resultVertical.wordIndex);
  		//return true;
  	}
});
*/

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

//Flexas carregadas, prontas para utilizar
//console.log(flexas);
console.log(searchDiagonal(arch.matrix, flexas, word));