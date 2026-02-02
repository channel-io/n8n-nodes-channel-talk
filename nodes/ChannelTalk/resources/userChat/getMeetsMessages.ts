import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatGetMeetsMessages = {
	resource: ['userChat'],
	operation: ['getMeetsMessages'],
};

export const userChatGetMeetsMessagesDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMeetsMessages,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMeetsMessages,
		},
		description: 'ID of the meet message',
	},
	{
		displayName: 'Sort Order',
		name: 'sortOrder',
		type: 'options',
		default: 'desc',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatGetMeetsMessages,
		},
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'desc' },
			{ name: 'Both', value: 'both' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'sortOrder',
			},
		},
	},
	{
		displayName: 'Since',
		name: 'since',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForUserChatGetMeetsMessages,
		},
		description: 'Pagination cursor',
		routing: {
			send: {
				type: 'query',
				property: 'since',
				value: '={{ $parameter.since?.trim() || undefined }}',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 25,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: showOnlyForUserChatGetMeetsMessages,
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
];
