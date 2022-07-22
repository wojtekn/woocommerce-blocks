exports.generateMarkdownMessage = ( dataFromParsedXml, filesWithNewError ) => {
	const header = generateHeader( dataFromParsedXml );
	const body = generateBody( filesWithNewError );

	return { header, body };
};

const generateHeader = ( dataFromParsedXml ) => {
	return `
TypeScript Errors Report
--------------------------
Files with errors: ${ dataFromParsedXml.totalFilesWithErrors }
Total errors: ${ dataFromParsedXml.totalErrors }
`;
};

const generateBody = ( filesWithNewError ) => {
	return Object.keys( filesWithNewError )
		.map( ( file ) => {
			return `
	File: ${ file }
${ filesWithNewError[ file ].map( ( error ) => `- ${ error }` ).join( '\r\n' ) }
		`;
		} )
		.join( '\r\n' );
};
