export interface ServerResponse {
	status: boolean;
	data: object | [];
	message?: string;
}

export interface ServerResponseError {
	status: boolean;
	message: string;
	err?: unknown;
}
