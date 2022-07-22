const { XMLParser } = require( 'fast-xml-parser' );
const { isSame, getDifferenceElements } = require( './array' );

exports.parseXml = ( filePath ) => {
	const parser = new XMLParser( {
		ignoreAttributes: false,
		attributeNamePrefix: '',
		attributesGroupName: '',
	} );
	const parsedFile = parser.parse( filePath );

	return getDataFromParsedXml( parsedFile );
};

const getErrorInfo = ( error ) => {
	const line = error.line;
	const column = error.column;
	const message = error.message;

	return `${ line }:${ column } - ${ message }`;
};

const getDataFromParsedXml = ( parsedXml ) => {
	const data = parsedXml.checkstyle.file;

	return data.reduce(
		( acc, { name, error } ) => {
			const pathFile = name;
			const hasMultipleErrors = Array.isArray( error );

			return {
				files: {
					[ pathFile ]: hasMultipleErrors
						? error.map( getErrorInfo )
						: [ getErrorInfo( error ) ],
					...acc.files,
				},
				totalErrors:
					acc.totalErrors + ( hasMultipleErrors ? error.length : 1 ),
				totalFilesWithErrors: acc.totalFilesWithErrors + 1,
			};
		},
		{
			totalErrors: 0,
			totalFilesWithErrors: 0,
		}
	);
};

const removeLineNumber = ( error ) => error.replace( /[0-9]/g, '' );

const isIntroduceNewErrors = (
	fileErrorsFromNewCheckStyle,
	fileErrorsFromCurrentCheckStyle
) => {
	const fileErrorsFromNewCheckStyleWithoutLineNumber =
		fileErrorsFromNewCheckStyle.map( removeLineNumber );
	const fileErrorsFromCurrentCheckStyleWithoutLineNumber =
		fileErrorsFromCurrentCheckStyle.map( removeLineNumber );

	return (
		fileErrorsFromNewCheckStyleWithoutLineNumber.length >
			fileErrorsFromCurrentCheckStyleWithoutLineNumber.length ||
		( fileErrorsFromNewCheckStyleWithoutLineNumber.length ===
			fileErrorsFromCurrentCheckStyleWithoutLineNumber.length &&
			! isSame(
				fileErrorsFromNewCheckStyleWithoutLineNumber,
				fileErrorsFromCurrentCheckStyleWithoutLineNumber
			) )
	);
};

exports.getFilesWithNewErrors = (
	newCheckStyleFileParsed,
	currentCheckStyleFileParsed
) => {
	const newFilesReport = newCheckStyleFileParsed.files;
	const currentFilesReport = currentCheckStyleFileParsed.files;

	return Object.keys( newFilesReport ).reduce( ( acc, pathfile ) => {
		const fileErrorsFromNewCheckStyle = newFilesReport[ pathfile ];
		const fileErrorsFromCurrentCheckStyle = currentFilesReport[ pathfile ];
		if (
			typeof fileErrorsFromCurrentCheckStyle === 'undefined' ||
			fileErrorsFromCurrentCheckStyle === null ||
			isIntroduceNewErrors(
				fileErrorsFromNewCheckStyle,
				fileErrorsFromCurrentCheckStyle
			)
		) {
			const newErrors = getDifferenceElements(
				fileErrorsFromNewCheckStyle,
				fileErrorsFromCurrentCheckStyle ?? []
			);

			return { ...acc, [ pathfile ]: newErrors };
		}
		return acc;
	}, {} );
};
