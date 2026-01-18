import type { INodeProperties } from 'n8n-workflow';

const showUrlTools = { resource: ['urlTools'] };

export const urlToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showUrlTools,
		},
		options: [
			{
				name: 'Encode URL',
				value: 'encode',
				action: 'Url encode a string',
				description: 'URL-encode a string',
			},
			{
				name: 'Decode URL',
				value: 'decode',
				action: 'Url decode a string',
				description: 'URL-decode a string',
			},
			{
				name: 'Normalize URL',
				value: 'normalize',
				action: 'Normalize a url encoded string',
				description: 'Decode then encode a string',
			},
		],
		default: 'encode',
	},
	{
		displayName: 'Value',
		name: 'data',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showUrlTools,
				operation: ['encode', 'decode', 'normalize'],
			},
		},
	},
];
