import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookCreate = {
	resource: ['webhook'],
	operation: ['create'],
};

const scopesJsonArrayExpression =
	'={{$value ? (() => { const arr = JSON.parse($value); return Array.isArray(arr) ? arr.filter(s => typeof s === "string") : undefined; })() : undefined}}';

const keywordsJsonArrayExpression =
	'={{$value ? (() => { const arr = JSON.parse($value); return Array.isArray(arr) ? arr.filter(k => typeof k === "string") : undefined; })() : undefined}}';

export const webhookCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookCreate,
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
			show: showOnlyForWebhookCreate,
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
		displayName: 'Scopes (JSON Array)',
		name: 'scopesJson',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		default: '["*"]',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookCreate,
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
	{
		displayName: 'API Version',
		name: 'apiVersion',
		type: 'string',
		default: 'v5',
		required: true,
		displayOptions: {
			show: showOnlyForWebhookCreate,
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		options: [
			{
				displayName: 'Keywords (JSON Array)',
				name: 'keywordsJson',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description:
					'(Deprecated) JSON array of keyword strings to filter events. Example: ["help", "support"].',
				routing: {
					send: {
						type: 'body',
						property: 'keywords',
						value: keywordsJsonArrayExpression,
					},
				},
			},
		],
	},
];
