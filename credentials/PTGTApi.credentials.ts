import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PTGTApi implements ICredentialType {
	name = 'ptgtApi';

	displayName = 'PostThatGetThis API';

	icon: Icon = { light: 'file:../icons/ptgt-logo.svg', dark: 'file:../icons/ptgt-logo.dark.svg' };

	documentationUrl = 'https://www.postthatgetthis.com';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.postthatgetthis.com',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.postthatgetthis.com',
			url: '/v1/uuid/generate',
			method: 'POST',
		},
	};
}
