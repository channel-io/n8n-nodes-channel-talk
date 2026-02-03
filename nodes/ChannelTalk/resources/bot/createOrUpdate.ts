import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBotCreateOrUpdate = {
	resource: ['bot'],
	operation: ['createOrUpdate'],
};

export const botCreateOrUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForBotCreateOrUpdate,
		},
		description: 'Name of the bot',
		routing: {
			send: {
				type: 'body',
				property: 'name',
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
			show: showOnlyForBotCreateOrUpdate,
		},
		options: [
			{
				displayName: 'Avatar URL',
				name: 'avatarUrl',
				type: 'string',
				default: '',
				description: 'URL of the bot avatar image',
				routing: {
					send: {
						type: 'body',
						property: 'avatarUrl',
						value: '={{ $parameter.additionalFields?.avatarUrl?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Broadcast',
				name: 'broadcast',
				type: 'boolean',
				default: false,
				description: 'Whether the bot can broadcast messages',
				routing: {
					send: {
						type: 'body',
						property: 'broadcast',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'Email address of the bot',
				routing: {
					send: {
						type: 'body',
						property: 'email',
						value: '={{ $parameter.additionalFields?.email?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Lurker',
				name: 'lurker',
				type: 'boolean',
				default: false,
				description: 'Whether the bot is a lurker (hidden from users)',
				routing: {
					send: {
						type: 'body',
						property: 'lurker',
					},
				},
			},
			{
				displayName: 'Name (I18n JSON)',
				name: 'nameI18nJson',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description:
					'JSON object for internationalized bot name. Example: {"en": "Bot", "ko": "봇"}.',
				routing: {
					send: {
						type: 'body',
						property: 'nameI18n',
						value: '={{ $parameter.additionalFields?.nameI18nJson ? JSON.parse($parameter.additionalFields.nameI18nJson) : undefined }}',
					},
				},
			},
		],
	},
];
