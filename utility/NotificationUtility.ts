export const GenerateOTP = () => {

    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));

    return { otp, expiry };
}

export const onRequestOTP = async (otp: number, to: string) => {
    const accountSID = 'ACdcdb291973a07b33c4b61335996f1713';
    const authToken = '629933a270ee1f4ea445c4f5f8aa5b91';
    const from = '+17075173129';
    const client = require('twilio')(accountSID, authToken);

    try {
        const response = await client.messages.create({
            body: `your OTP is ${otp}`,
            from: from,
            channel: "sms",
            to: `+91${to}`
        });
        return response;
    } catch (error) {
        console.error(error);
    }

}