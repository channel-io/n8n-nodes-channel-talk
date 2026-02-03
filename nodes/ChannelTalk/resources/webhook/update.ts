import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookUpdate = {
	resource: ['webhook'],
	operation: ['update'],
};

const scopesJsonArrayExpression =
	'={{$value ? (() => { const arr = JSON.parse($value); return Array.isArray(arr) ? arr.filter(s => typeof s === "string") : undefined; })() : undefined}}';

const keywordsJsonArrayExpression =
	'={{$value ? (() => { const arr = JSON.parse($value); return Array.isArray(arr) ? arr.filter(k => typeof k === "string") : undefined; })() : undefined}}';

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
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		options: [
			{
				displayName: 'API Version',
				name: 'apiVersion',
				type: 'string',
				default: '',
				description: 'API version for webhook payloads (e.g., "v5")',
				routing: {
					send: {
						type: 'body',
						property: 'apiVersion',
						value: '={{ $parameter.updateFields?.apiVersion?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Keywords (JSON Array)',
				name: 'keywordsJson',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: '(Deprecated) JSON array of keyword strings to filter events. Example: ["help", "support"].',
				routing: {
					send: {
						type: 'body',
						property: 'keywords',
						value: keywordsJsonArrayExpression,
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the webhook',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{ $parameter.updateFields?.name?.trim() || undefined }}',
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
				default: '',
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
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The URL to receive webhook events',
				routing: {
					send: {
						type: 'body',
						property: 'url',
						value: '={{ $parameter.updateFields?.url?.trim() || undefined }}',
					},
				},
			},
		],
	},
];
