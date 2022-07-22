const fs = require( 'fs' );
const { getOctokit, context } = require( '@actions/github' );
const { setFailed, getInput } = require( '@actions/core' );
const { parseXml, getFilesWithNewErrors } = require( './utils/xml' );
const { generateMarkdownMessage } = require( './utils/markdown' );
const { addRecord } = require( './utils/airtable' );
const { getFileContent, decodeBase64 } = require( './utils/github' );

const runner = async () => {
	const token = getInput( 'repo-token', { required: true } );
	const octokit = getOctokit( token );
	const payload = context.payload;
	const repo = payload.repository.name;
	const owner = payload.repository.owner.login;
	const fileName = getInput( 'compare', {
		required: true,
	} );
	const newCheckStyleFile = fs.readFileSync( fileName );
	const newCheckStyleFileParsed = parseXml( newCheckStyleFile );
	const currentCheckStyleFile = await getFileContent( {
		octokit,
		owner,
		repo,
		fileName,
		onFail: setFailed,
	} );

	if ( ! currentCheckStyleFile.data.content ) {
		setFailed( 'No Content Available' );
		return;
	}

	const currentCheckStyleFileContent = decodeBase64(
		currentCheckStyleFile.data.content
	);

	const currentCheckStyleFileContentParsed = parseXml(
		currentCheckStyleFileContent
	);
	const filesWithNewErrors = getFilesWithNewErrors(
		newCheckStyleFileParsed,
		currentCheckStyleFileContentParsed
	);

	const { header, body } = generateMarkdownMessage(
		newCheckStyleFileParsed,
		filesWithNewErrors
	);

	console.log( body );

	const numberOfFilesWithErrors = Object.keys( filesWithNewErrors ).length;

	const message =
		header +
		'\n' +
		( numberOfFilesWithErrors > 0
			? `⚠️ ⚠️ This PR introduces new TS errors on ${ numberOfFilesWithErrors } files: \n` +
			  '<details> \n' +
			  '``` \n' +
			  body +
			  '``` \n' +
			  '</details>'
			: '🎉 🎉 This PR does not introduce new TS errors.' );

	await octokit.rest.issues.createComment( {
		owner,
		repo,
		issue_number: payload.pull_request.number,
		body: message,
	} );

	if ( process.env[ 'CURRENT_BRANCH' ] === 'trunk' ) {
		try {
			await addRecord( currentCheckStyleFileContentParsed.totalErrors );
		} catch ( error ) {
			setFailed( error );
		}
	}
};

runner();

// const test = () => {
// 	const newCheckStyleFile = fs.readFileSync( '../../checkstyle.xml' );
// 	const oldCheckStyleFile = fs.readFileSync( '../../checkstyle1.xml' );

// 	const parsedNewCheckStyleFile = parseXml( newCheckStyleFile );
// 	const parsedOldCheckStyleFile = parseXml( oldCheckStyleFile );

// 	const filesWithNewErrors = getFilesWithNewErrors(
// 		parsedNewCheckStyleFile,
// 		parsedOldCheckStyleFile
// 	);

// 	console.log( filesWithNewErrors );
// };

// test();
