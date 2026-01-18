import type { INodeProperties } from 'n8n-workflow';

const showOcrTools = { resource: ['ocrTools'] };

export const ocrToolsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOcrTools,
		},
		options: [
			{
				name: 'Extract Text',
				value: 'extract',
				action: 'Extract text from an image',
				description: 'Extract text from an image URL or base64 data',
			},
			{
				name: 'Get Job Status',
				value: 'extractStatus',
				action: 'Get OCR job status',
				description: 'Check status of an OCR extraction job',
			},
		],
		default: 'extract',
	},
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		options: [
			{ name: 'URL', value: 'url' },
			{ name: 'Base64', value: 'base64' },
		],
		default: 'url',
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extract'],
			},
		},
	},
	{
		displayName: 'Image URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		description: 'Public URL to the image',
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extract'],
				inputType: ['url'],
			},
		},
	},
	{
		displayName: 'Base64 Input Mode',
		name: 'base64InputMode',
		type: 'options',
		options: [
			{ name: 'Base64 Text', value: 'text' },
			{ name: 'Binary', value: 'binary' },
		],
		default: 'text',
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extract'],
				inputType: ['base64'],
			},
		},
	},
	{
		displayName: 'Base64',
		name: 'base64',
		type: 'string',
		default: '',
		required: true,
		description: 'Base64 string or data URI',
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extract'],
				inputType: ['base64'],
				base64InputMode: ['text'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		description: 'Binary property name to read from',
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extract'],
				inputType: ['base64'],
				base64InputMode: ['binary'],
			},
		},
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		default: '',
		description: 'Optional filename to associate with the base64 payload',
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extract'],
				inputType: ['base64'],
			},
		},
	},
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOcrTools,
				operation: ['extractStatus'],
			},
		},
	},
];
