

export interface _response_I {

    ok?: boolean;
    statusCode?: number;
    path?: string;
    data?: any;
    message?: _responseMessage_I[];
    paginator?: any;
    err?: any;

}

export interface _responseMessage_I {
    message: string;
    type: string;
    index?: string;
}