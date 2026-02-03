import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatSnooze = {
	resource: ['userChat'],
	operation: ['snooze'],
};

export const userChatSnoozeDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatSnooze,
		},
		description: 'ID of the user chat to be snoozed',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatSnooze,
		},
		description: 'Snooze duration (e.g. PT23H50M)',
		routing: {
			send: {
				type: 'query',
				property: 'duration',
			},
		},
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatSnooze,
		},
		description: 'Name of the bot that snoozes the user chat',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
			},
		},
	},
];
