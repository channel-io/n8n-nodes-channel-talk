import type { INodeProperties } from 'n8n-workflow';
import { revisionListDescription } from './list';
import { revisionGetDescription } from './get';
import { revisionBatchGetDescription } from './batchGet';
import { revisionCreateDescription } from './create';
import { revisionSaveDescription } from './save';
import { revisionDeleteDescription } from './delete';
import { revisionPublishDescription } from './publish';
import { revisionUnpublishDescription } from './unpublish';

const showOnlyForRevision = {
	resource: ['revision'],
};

export const revisionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRevision,
		},
		options: [
			{
				name: 'Batch Get',
				value: 'batchGet',
				action: 'Batch get revisions',
				description: 'Get multiple revisions by IDs (max 25)',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions/batch',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a revision',
				description: 'Create a new revision in an article in draft state',
				routing: {
					request: {
						method: 'POST',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a revision',
				description: 'Delete a revision of an article',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions/{{$parameter.revisionId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a revision',
				description: 'Get a revision by article and revision ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions/{{$parameter.revisionId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List revisions',
				description: 'List revisions in an article by language',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions',
					},
				},
			},
			{
				name: 'Publish',
				value: 'publish',
				action: 'Publish a revision',
				description: 'Publish a revision, making it the current revision accessible on the website',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions/{{$parameter.revisionId}}/publish',
					},
				},
			},
			{
				name: 'Save',
				value: 'save',
				action: 'Save a revision',
				description: 'Save a draft revision with new content',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions/{{$parameter.revisionId}}',
					},
				},
			},
			{
				name: 'Unpublish',
				value: 'unpublish',
				action: 'Unpublish a revision',
				description: 'Unpublish a revision, making it inaccessible on the website',
				routing: {
					request: {
						method: 'PUT',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}/revisions/{{$parameter.revisionId}}/unpublish',
					},
				},
			},
		],
		default: 'list',
	},
	...revisionListDescription,
	...revisionGetDescription,
	...revisionBatchGetDescription,
	...revisionCreateDescription,
	...revisionSaveDescription,
	...revisionDeleteDescription,
	...revisionPublishDescription,
	...revisionUnpublishDescription,
];
