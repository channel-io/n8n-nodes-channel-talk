import type { INodeProperties } from 'n8n-workflow';
import { articleListDescription } from './list';
import { articleGetByIdDescription } from './getById';
import { articleGetBySlugDescription } from './getBySlug';
import { articleBatchGetDescription } from './batchGet';
import { articleCreateDescription } from './create';
import { articleDeleteDescription } from './delete';

const showOnlyForArticle = {
	resource: ['article'],
};

export const articleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForArticle,
		},
		options: [
			{
				name: 'Batch Get',
				value: 'batchGet',
				action: 'Batch get articles',
				description: 'Get multiple articles by IDs (max 25)',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/articles/batch',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create an article',
				description: 'Create a new article and its revision in draft state',
				routing: {
					request: {
						method: 'POST',
						url: '/open/v1/spaces/$me/articles',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an article',
				description: 'Delete an article and all its revisions',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}',
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getById',
				action: 'Get an article by ID',
				description: 'Get an article by its ID and language',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/articles/{{$parameter.articleId}}',
					},
				},
			},
			{
				name: 'Get by Slug',
				value: 'getBySlug',
				action: 'Get an article by slug',
				description: 'Get an article by its slug and language',
				routing: {
					request: {
						method: 'GET',
						url: '=/open/v1/spaces/$me/articles/${{$parameter.slug}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List articles',
				description: 'List articles of a space by language',
				routing: {
					request: {
						method: 'GET',
						url: '/open/v1/spaces/$me/articles',
					},
				},
			},
		],
		default: 'list',
	},
	...articleListDescription,
	...articleGetByIdDescription,
	...articleGetBySlugDescription,
	...articleBatchGetDescription,
	...articleCreateDescription,
	...articleDeleteDescription,
];
