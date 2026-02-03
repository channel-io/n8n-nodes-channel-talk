import type { INodeProperties } from 'n8n-workflow';

const showOnlyForManagerList = {
	resource: ['manager'],
	operation: ['list'],
};

export const managerListDescription: INodeProperties[] = [
	{
		displayName: 'Query Options',
		name: 'queryOptions',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		displayOptions: {
			show: showOnlyForManagerList,
		},
		options: [
			{
				displayName: 'Since',
				name: 'since',
				type: 'string',
				default: '',
				description: 'Pagination cursor from previous response (next value)',
				routing: {
					send: {
						type: 'query',
						property: 'since',
						value: '={{ $parameter.queryOptions?.since?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
						value: '={{ $parameter.queryOptions?.limit ?? undefined }}',
					},
				},
			},
		],
	},
];
