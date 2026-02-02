import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatAssignToManager = {
	resource: ['userChat'],
	operation: ['assignToManager'],
};

export const userChatAssignToManagerDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatAssignToManager,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Manager ID',
		name: 'managerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatAssignToManager,
		},
		description: 'ID of the manager to be assigned',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatAssignToManager,
		},
		description: 'Name of the bot that assigns the manager',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
			},
		},
	},
];
