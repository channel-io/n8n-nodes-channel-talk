import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTopicGet = {
	resource: ['topic'],
	operation: ['get'],
};

export const topicGetDescription: INodeProperties[] = [
	{
		displayName: 'Topic ID',
		name: 'topicId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTopicGet,
		},
		description: 'The unique identifier of the topic',
	},
];
