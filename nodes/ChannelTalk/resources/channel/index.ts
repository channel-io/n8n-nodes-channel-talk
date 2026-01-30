import type { INodeProperties } from 'n8n-workflow';

const showOnlyForChannel = {
	resource: ['channel'],
};

export const channelDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForChannel,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get channel',
				description: 'Retrieve the channel connected with the given API key credentials',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v5/channel',
					},
				},
			},
		],
		default: 'get',
	},
];
