import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAuthorGet = {
	resource: ['author'],
	operation: ['get'],
};

export const authorGetDescription: INodeProperties[] = [
	{
		displayName: 'Author ID',
		name: 'authorId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForAuthorGet,
		},
		description: 'The unique identifier of the author',
	},
];
