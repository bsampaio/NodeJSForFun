if(!process.argv[2]){
	console.log("Será necessária uma matriz de entrada terceiro argumento");
	process.exit();
}

if(!process.argv[3]){
	console.log("Será necessário um termo de pesquisa como quarto argumento");
	process.exit();
}

var arch = require('./'+process.argv[2]+'.json');
var word = process.argv[3];

var search = function(word, collection, collectionIndex){
	var wordIndex = 0;
	var linhaPos;
	var colPos;

	collection.some(function (character, charIndex, array){
	
		//Encontrando a palavra
		if(character === word[wordIndex]){
			wordIndex++;
		}else{
			wordIndex = 0;
		}

		//Encontrando a collection
		if(wordIndex === word.length-1){
			linhaPos = collectionIndex+1;
			colPos = charIndex+1-(word.length-1)+1;
			//return true;
		}
	});
	return {
			"linhaPos":linhaPos,
			"wordIndex":colPos
	};
};

//Criando a mesma matriz, porém vertical
var tmpCol = [];
var verticalMatrix = [];
for (var i = 0; i < arch.matrix.length; i++) {
	tmpCol = [];
	for (var j = 0; j < arch.matrix[1].length; j++) {
		//Percorre coluna por coluna
		tmpCol[tmpCol.length] = arch.matrix[j][i];
	};
	verticalMatrix[verticalMatrix.length] = tmpCol;
};

arch.matrix.some(function (linha, index, array) {
	var resultHorizontal = search(word,linha,index)

  	if(resultHorizontal.linhaPos){
  		console.log('\n -- Busca Horizontal --');
  		console.log('Palavra \''+word+'\' encontrada na linha: '+resultHorizontal.linhaPos+' coluna: '+resultHorizontal.wordIndex);
  		//return true;
  	}
});

verticalMatrix.some(function (coluna, index, array){
	var resultVertical = search(word,coluna,index)
  	if(resultVertical.linhaPos){
  		console.log('\n -- Busca Vertical --');
  		console.log('Palavra \''+word+'\' encontrada na coluna: '+resultVertical.linhaPos+' linha: '+resultVertical.wordIndex);
  		//return true;
  	}
});

console.log('\n');