import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserChatInvite = {
	resource: ['userChat'],
	operation: ['invite'],
};

export const userChatInviteDescription: INodeProperties[] = [
	{
		displayName: 'User Chat ID',
		name: 'userChatId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatInvite,
		},
		description: 'ID of the user chat to be accessed',
	},
	{
		displayName: 'Bot Name',
		name: 'botName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForUserChatInvite,
		},
		description: 'Name of the bot that invites the managers',
		routing: {
			send: {
				type: 'query',
				property: 'botName',
			},
		},
	},
	{
		displayName: 'Manager IDs',
		name: 'managerIds',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForUserChatInvite,
		},
		description: 'Comma-separated manager IDs to invite',
		routing: {
			send: {
				type: 'query',
				property: 'managerIds',
				value: '={{ $parameter.managerIds ? $parameter.managerIds.split(",").map((id: string) => id.trim()).filter(Boolean) : undefined }}',
			},
		},
	},
];
