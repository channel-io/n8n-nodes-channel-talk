import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTopicBatchGet = {
	resource: ['topic'],
	operation: ['batchGet'],
};

export const topicBatchGetDescription: INodeProperties[] = [
	{
		displayName: 'Topic IDs',
		name: 'topicIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTopicBatchGet,
		},
		description: 'Comma-separated list of topic IDs to retrieve (up to 25)',
		routing: {
			send: {
				type: 'query',
				property: 'ids[]',
				value:
					'={{ $parameter.topicIds.split(",").map((id: string) => id.trim()).filter((id: string) => id) }}',
			},
		},
	},
];
