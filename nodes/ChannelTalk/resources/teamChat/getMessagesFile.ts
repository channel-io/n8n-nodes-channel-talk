import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatGetMessagesFile = {
	resource: ['teamChat'],
	operation: ['getMessagesFile'],
};

export const teamChatGetMessagesFileDescription: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGetMessagesFile,
		},
		description: 'The unique identifier of the group',
	},
	{
		displayName: 'File Key',
		name: 'key',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGetMessagesFile,
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
