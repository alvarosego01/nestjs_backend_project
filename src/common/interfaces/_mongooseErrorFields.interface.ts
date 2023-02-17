
export interface MongooseFieldsError_I {
    name: string;
    message: string;
    properties: fieldProperties_I;
    kind: string;
    path: string;
    value: string;
}

export interface fieldProperties_I {
    message: string;
    type: string;
    path: string;
    value: string;
}
