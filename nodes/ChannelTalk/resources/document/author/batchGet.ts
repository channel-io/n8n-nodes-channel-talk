import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAuthorBatchGet = {
	resource: ['author'],
	operation: ['batchGet'],
};

export const authorBatchGetDescription: INodeProperties[] = [
	{
		displayName: 'Author IDs',
		name: 'authorIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForAuthorBatchGet,
		},
		description: 'Comma-separated list of author IDs to retrieve (up to 25)',
		routing: {
			send: {
				type: 'query',
				property: 'ids[]',
				value:
					'={{ $parameter.authorIds.split(",").map((id: string) => id.trim()).filter((id: string) => id) }}',
			},
		},
	},
];
