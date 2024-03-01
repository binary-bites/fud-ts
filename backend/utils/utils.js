export default function checkInput(requiredFields, body) {

    const missingFields = requiredFields.filter(field => !body[field]);

   if (missingFields.length > 0) {
       throw Error(`Missing required field(s): ${missingFields.join(', ')}`);
   }

   return 'all good';
 }
