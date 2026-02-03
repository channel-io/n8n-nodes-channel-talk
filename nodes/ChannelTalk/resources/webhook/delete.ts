import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookDelete = {
	resource: ['webhook'],
	operation: ['delete'],
};

export const webhookDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookDelete,
		},
		description: 'The unique identifier of the webhook to delete',
	},
];
