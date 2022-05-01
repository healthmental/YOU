const accountSid = 'AC913e81a1a0885ca6aa192816a25a0265';
const authToken = 'a7d6c34deb5bb3e4ef61d5555f17e347';
const client = require('twilio')(accountSid, authToken);
exports.sendmessage = (appointmentData) =>{
    client.messages
        .create({
            body: `Hello ${appointmentData.name}
            Your reservation has been confirmed for ${appointmentData.time}
            at ${appointment.start}
            `,
            messagingServiceSid: 'MG50a07243e893c14beeb71b8530287f7b',
            to: `${appointmentData.phone}`
    })
    .then(message=>{})
    .done();
}