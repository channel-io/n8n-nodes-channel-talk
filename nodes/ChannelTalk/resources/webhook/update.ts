import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookUpdate = {
	resource: ['webhook'],
	operation: ['update'],
};

const scopesJsonArrayExpression =
	'={{ (() => { const arr = JSON.parse($value); return Array.isArray(arr) ? arr.filter(s => typeof s === "string") : []; })() }}';

export const webhookUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		description: 'The unique identifier of the webhook to update',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		description: 'Name of the webhook',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		description: 'The URL to receive webhook events',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'API Version',
		name: 'apiVersion',
		type: 'string',
		default: 'v5',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		description: 'API version for webhook payloads (e.g., "v5")',
		routing: {
			send: {
				type: 'body',
				property: 'apiVersion',
			},
		},
	},
	{
		displayName: 'Scopes (JSON Array)',
		name: 'scopesJson',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		default: '["*"]',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		description:
			'JSON array of event scopes. Use ["*"] for all events. Available scopes: userChat.opened, message.created.userChat, message.created.teamChat, lead.upserted.contact, lead.upserted.subscription, lead.deleted, member.upserted.contact, member.upserted.subscription, member.deleted.',
		routing: {
			send: {
				type: 'body',
				property: 'scopes',
				value: scopesJsonArrayExpression,
			},
		},
	},
];
