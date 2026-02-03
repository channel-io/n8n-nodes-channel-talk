import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatGetMessagesFileByName = {
	resource: ['teamChat'],
	operation: ['getMessagesFileByName'],
};

export const teamChatGetMessagesFileByNameDescription: INodeProperties[] = [
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGetMessagesFileByName,
		},
		description: 'The name of the group (without @ prefix)',
	},
	{
		displayName: 'File Key',
		name: 'key',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGetMessagesFileByName,
		},
		description: 'The key of the file to get the signed URL for',
		routing: {
			send: {
				type: 'query',
				property: 'key',
			},
		},
	},
];
