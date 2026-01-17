import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export async function ptgtApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	options: IHttpRequestOptions,
) {
	const credentials = await this.getCredentials('ptgtApi');
	const baseUrl =
		(typeof credentials?.baseUrl === 'string' && credentials.baseUrl.trim() !== ''
			? credentials.baseUrl
			: 'https://api.postthatgetthis.com') ?? 'https://api.postthatgetthis.com';

	const requestOptions: IHttpRequestOptions = {
		...options,
		url: `${baseUrl}${options.url}`,
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'ptgtApi', requestOptions);
}
