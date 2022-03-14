/*
    Action test utilities
*/

export const mockCreateResponse = (request, id) => {
    const response = Object.assign({}, request);
    response._id = id;

    return response;
};

export const mockCreateUserResponse = (request, id) => {
    const response = Object.assign({}, request);
    response.id = id;

    return response;
};
