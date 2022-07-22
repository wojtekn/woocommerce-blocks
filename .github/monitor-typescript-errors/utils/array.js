exports.isSame = ( array1, array2 ) =>
	array1.every( ( el ) => array2.includes( el ) );

exports.getDifferenceElements = ( array1, array2 ) =>
	array1.filter( ( x ) => ! array2.includes( x ) );
