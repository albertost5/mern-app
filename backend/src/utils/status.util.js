export default function getStatusCode( obj ) {
    return parseInt( obj.code.substring(0,3) ); 
}