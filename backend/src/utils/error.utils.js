export default function errorResponse( code, title, message ) {
    return {
        code, 
        title, 
        message
    }
}