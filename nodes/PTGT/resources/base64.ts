import type { INodeProperties } from 'n8n-workflow';

const showBase64 = { resource: ['base64'] };

export const base64Description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showBase64,
		},
		options: [
			{
				name: 'Decode Base64',
				value: 'decode',
				action: 'Create a file from base64',
				description: 'Upload a base64 string to storage',
			},
			{
				name: 'Encode File',
				value: 'encode',
				action: 'Encode a file to base64',
				description: 'Convert a file ID, key, or URL to base64',
			},
			{
				name: 'Normalize Base64',
				value: 'normalize',
				action: 'Validate and normalize base64',
				description: 'Normalize base64 payloads',
			},
		],
		default: 'decode',
	},
	{
		displayName: 'Base64',
		name: 'data',
		type: 'string',
		default: '',
		required: true,
		description: 'Base64 string or data URI',
		displayOptions: {
			show: {
				...showBase64,
				operation: ['decode', 'normalize'],
			},
		},
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		default: '',
		description: 'Optional filename for the uploaded file',
		displayOptions: {
			show: {
				...showBase64,
				operation: ['decode'],
			},
		},
	},
	{
		displayName: 'Content Type',
		name: 'contentType',
		type: 'string',
		default: '',
		description: 'Optional MIME type override',
		displayOptions: {
			show: {
				...showBase64,
				operation: ['decode', 'normalize'],
			},
		},
	},
	{
		displayName: 'Source',
		name: 'source',
		type: 'options',
		options: [
			{ name: 'File ID', value: 'fileId' },
			{ name: 'Key', value: 'key' },
			{ name: 'URL', value: 'url' },
		],
		default: 'fileId',
		displayOptions: {
			show: {
				...showBase64,
				operation: ['encode'],
			},
		},
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showBase64,
				operation: ['encode'],
				source: ['fileId'],
			},
		},
	},
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showBase64,
				operation: ['encode'],
				source: ['key'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showBase64,
				operation: ['encode'],
				source: ['url'],
			},
		},
	},
];
