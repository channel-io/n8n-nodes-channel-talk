import type { INodeProperties } from 'n8n-workflow';
import { webhookListDescription } from './list';
import { webhookGetDescription } from './get';
import { webhookCreateDescription } from './create';
import { webhookUpdateDescription } from './update';
import { webhookDeleteDescription } from './delete';

const showOnlyForWebhook = {
	resource: ['webhook'],
};

export const webhookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWebhook,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a webhook',
				description: 'Create a new webhook',
				routing: {
					request: {
						method: 'POST',
						url: '/open/v5/webhooks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a webhook',
				description: 'Delete a webhook',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v5/webhooks/{{$parameter.webhookId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a webhook',
				description: 'Get a webhook by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v5/webhooks/{{$parameter.webhookId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List all webhooks',
				description: 'List all webhooks in the channel',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v5/webhooks',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a webhook',
				description: 'Update a webhook',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v5/webhooks/{{$parameter.webhookId}}',
					},
				},
			},
		],
		default: 'list',
	},
	...webhookListDescription,
	...webhookGetDescription,
	...webhookCreateDescription,
	...webhookUpdateDescription,
	...webhookDeleteDescription,
];
