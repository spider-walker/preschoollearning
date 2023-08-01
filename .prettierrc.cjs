/**
 * @type {import("prettier").Config}
 */
module.exports = {
	semi: true,
	tabWidth: 2,
	singleQuote: true,
	useTabs: true,
	endOfLine: 'crlf',
	trailingComma: 'es5',
	overrides: [
		{
			files: '*.ts',
			options: {
				parser: 'typescript',
			},
		},
	],
};
