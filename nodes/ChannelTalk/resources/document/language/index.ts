import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLanguage = {
	resource: ['language'],
};

export const languageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLanguage,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List supported languages',
				description: 'Retrieve the list of supported languages in the document system',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/languages',
					},
				},
			},
		],
		default: 'list',
	},
];
