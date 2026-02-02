import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatList = {
	resource: ['userChat'],
	operation: ['list'],
};

export const userChatListDescription: INodeProperties[] = [
	{
		displayName: 'State',
		name: 'state',
		type: 'options',
		default: 'opened',
		displayOptions: {
			show: showOnlyForUserChatList,
		},
		description: 'Filter user chats by state',
		options: [
			{ name: 'Closed', value: 'closed' },
			{ name: 'Initial', value: 'initial' },
			{ name: 'Missed', value: 'missed' },
			{ name: 'Opened', value: 'opened' },
			{ name: 'Queued', value: 'queued' },
			{ name: 'Snoozed', value: 'snoozed' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'state',
			},
		},
	},
	{
		displayName: 'Sort Order',
		name: 'sortOrder',
		type: 'options',
		default: 'desc',
		displayOptions: {
			show: showOnlyForUserChatList,
		},
		description: 'Sort order for results',
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
			show: showOnlyForUserChatList,
		},
		description: 'Pagination cursor from previous response (next value)',
		routing: {
			send: {
				type: 'query',
				property: 'since',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: showOnlyForUserChatList,
		},
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
];
