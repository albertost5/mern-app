export default function errorResponse( code, message ) {
    
    const statusCode = parseInt( code.substring(0, 3) );

    const errorResponse = {
        code,
        title: '',
        message
    }

    switch ( statusCode ) {
        case 400:
            errorResponse.title = 'BAD_REQUEST';
            break;
        case 500:
            errorResponse.title = 'INTERNAL_SERVER_ERROR';
            break;
        case '':
        
            break;
        default:
            break;
    }

    return errorResponse;
}