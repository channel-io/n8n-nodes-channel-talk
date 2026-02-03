import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBotDelete = {
	resource: ['bot'],
	operation: ['delete'],
};

export const botDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Bot ID',
		name: 'botId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForBotDelete,
		},
		description: 'The unique identifier of the bot to delete',
	},
];
