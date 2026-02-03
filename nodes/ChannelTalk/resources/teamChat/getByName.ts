import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamChatGetByName = {
	resource: ['teamChat'],
	operation: ['getByName'],
};

export const teamChatGetByNameDescription: INodeProperties[] = [
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamChatGetByName,
		},
		description: 'The name of the group (without @ prefix)',
	},
];
