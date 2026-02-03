import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookGet = {
	resource: ['webhook'],
	operation: ['get'],
};

export const webhookGetDescription: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookGet,
		},
		description: 'The unique identifier of the webhook',
	},
];
