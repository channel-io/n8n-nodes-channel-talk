import type { INodeProperties } from 'n8n-workflow';
import { botListDescription } from './list';
import { botCreateOrUpdateDescription } from './createOrUpdate';
import { botDeleteDescription } from './delete';

const showOnlyForBots = {
	resource: ['bot'],
};

export const botDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBots,
		},
		options: [
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				action: 'Create or update a bot',
				description: 'Create a new bot or update an existing one',
				routing: {
					request: {
						method: 'POST',
						url: '/open/v5/bots',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a bot',
				description: 'Delete a bot',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/bots/{{$parameter.botId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List all bots',
				description: 'List all bots in the channel',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v5/bots',
					},
				},
			},
		],
		default: 'list',
	},
	...botListDescription,
	...botCreateOrUpdateDescription,
	...botDeleteDescription,
];
