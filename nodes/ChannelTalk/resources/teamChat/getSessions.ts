import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatGetSessions = {
	resource: ['teamChat'],
	operation: ['getSessions'],
};

export const teamChatGetSessionsDescription: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGetSessions,
		},
		description: 'The unique identifier of the group',
	},
];
