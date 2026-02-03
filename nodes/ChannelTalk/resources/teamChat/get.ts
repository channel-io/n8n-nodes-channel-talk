import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatGet = {
	resource: ['teamChat'],
	operation: ['get'],
};

export const teamChatGetDescription: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGet,
		},
		description: 'The unique identifier of the group',
	},
];
