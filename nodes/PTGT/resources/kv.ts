import type { INodeProperties } from 'n8n-workflow';

const showKv = { resource: ['kv'] };

export const kvDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showKv,
		},
		options: [
			{
				name: 'Set Value',
				value: 'set',
				action: 'Set a key value',
				description: 'Store a value with optional TTL',
			},
			{
				name: 'Get Value',
				value: 'get',
				action: 'Get a value',
				description: 'Fetch a stored value',
			},
			{
				name: 'Delete Value',
				value: 'delete',
				action: 'Delete a value',
				description: 'Delete a stored value',
			},
		],
		default: 'set',
	},
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showKv,
				operation: ['set', 'get', 'delete'],
			},
		},
	},
	{
		displayName: 'Value (JSON)',
		name: 'value',
		type: 'json',
		default: '',
		description: 'Value to store',
		displayOptions: {
			show: {
				...showKv,
				operation: ['set'],
			},
		},
	},
	{
		displayName: 'TTL Seconds',
		name: 'ttlSeconds',
		type: 'number',
		default: 300,
		description: 'Time to live in seconds',
		displayOptions: {
			show: {
				...showKv,
				operation: ['set'],
			},
		},
	},
];
