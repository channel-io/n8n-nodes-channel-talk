import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSpace = {
	resource: ['space'],
};

export const spaceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSpace,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a space',
				description: "Retrieve this space's information",
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me',
					},
				},
			},
		],
		default: 'get',
	},
];
