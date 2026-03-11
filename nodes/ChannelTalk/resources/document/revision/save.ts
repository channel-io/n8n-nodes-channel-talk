import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRevisionSave = {
	resource: ['revision'],
	operation: ['save'],
};

export const revisionSaveDescription: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionSave,
		},
		description: 'The unique identifier of the article',
	},
	{
		displayName: 'Revision ID',
		name: 'revisionId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForRevisionSave,
		},
		description: 'The unique identifier of the revision',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForRevisionSave,
		},
		options: [
			{
				displayName: 'Author ID',
				name: 'authorId',
				type: 'string',
				default: '',
				description: 'ID of the author',
				routing: {
					send: {
						type: 'body',
						property: 'authorId',
						value: '={{ $parameter.updateFields?.authorId?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Body (JSON)',
				name: 'bodyJson',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Body content as JSON array of objects',
				routing: {
					send: {
						type: 'body',
						property: 'body',
						value:
							'={{ $parameter.updateFields?.bodyJson ? JSON.parse($parameter.updateFields.bodyJson) : undefined }}',
					},
				},
			},
			{
				displayName: 'Body HTML',
				name: 'bodyHtml',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Body content as HTML string',
				routing: {
					send: {
						type: 'body',
						property: 'bodyHtml',
						value: '={{ $parameter.updateFields?.bodyHtml?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Internal name of the revision',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{ $parameter.updateFields?.name?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Subtitle',
				name: 'subtitle',
				type: 'string',
				default: '',
				description: 'Subtitle of the revision',
				routing: {
					send: {
						type: 'body',
						property: 'subtitle',
						value: '={{ $parameter.updateFields?.subtitle?.trim() || undefined }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the revision',
				routing: {
					send: {
						type: 'body',
						property: 'title',
						value: '={{ $parameter.updateFields?.title?.trim() || undefined }}',
					},
				},
			},
		],
	},
];
