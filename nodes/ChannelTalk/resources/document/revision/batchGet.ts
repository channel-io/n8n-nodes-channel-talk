import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionBatchGet = {
	resource: ['revision'],
	operation: ['batchGet'],
};

export const revisionBatchGetDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionBatchGet,
		},
		description: 'The unique identifier of the article',
	},
	{
		displayName: 'Revision IDs',
		name: 'revisionIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionBatchGet,
		},
		description: 'Comma-separated list of revision IDs (max 25)',
		routing: {
			send: {
				type: 'query',
				property: 'ids[]',
				value:
					'={{ $parameter.revisionIds.split(",").map((id: string) => id.trim()).filter((id: string) => id) }}',
			},
		},
	},
];
