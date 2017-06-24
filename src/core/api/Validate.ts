/**
 * core.api.Validate
 * ------------------------------------------------
 *
 * Those annotations are used to simplify the use of request (payload)
 * validation. The '@Request(RequestBodyClass)' annotation defines the
 * the validation rules with his parameter and the '@Validate' runs all
 * the given validation classes.
 */

import 'reflect-metadata';
import { RequestBody } from './RequestBody';


const requestMetadataKey = Symbol('ValidateRequest');

interface RequestParameter {
    request: typeof RequestBody;
    index: number;
}

/**
 * Request annotation marks the parameters, which should be validated as a RequestBody.
 *
 * @param request
 */
export const Request = (request: typeof RequestBody) => (target: object, propertyKey: string | symbol, parameterIndex: number): any => {
    const existingRequestParameters: RequestParameter[] = Reflect.getOwnMetadata(requestMetadataKey, target, propertyKey) || [];
    existingRequestParameters.push({
        request,
        index: parameterIndex
    });
    Reflect.defineMetadata(requestMetadataKey, existingRequestParameters, target, propertyKey);
};

/**
 * Validate annotation builds the given RequestBodies and validates them
 *
 * @param target
 * @param propertyName
 * @param descriptor
 */
export const Validate = (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<() => void>): any => {
    const method = descriptor.value;
    descriptor.value = async function(...args: any[]): Promise<any> {
        const requestParameters: RequestParameter[] = Reflect.getOwnMetadata(requestMetadataKey, target, propertyName);
        if (requestParameters.length > 0) {
            for (const requestParameter of requestParameters) {
                const request = new requestParameter.request(args[requestParameter.index]);
                await request.validate();
            }
        }
        return method && method.apply(this, args);
    };

    return descriptor;
};
