global._OTP_VAULT = global._OTP_VAULT || {};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { email, otp } = req.body || {};
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanOtp = (otp || '').trim();

  const record = global._OTP_VAULT[cleanEmail];
  if (!record) {
    return res.status(404).json({ valid: false, notFound: true, message: 'Code record not found on server.' });
  }

  if (Date.now() > record.expiresAt) {
    delete global._OTP_VAULT[cleanEmail];
    return res.status(400).json({ valid: false, message: 'Verification code has expired.' });
  }

  if (record.otp !== cleanOtp) {
    return res.status(400).json({ valid: false, message: 'Incorrect verification code. Please check your Gmail inbox.' });
  }

  delete global._OTP_VAULT[cleanEmail];
  return res.status(200).json({ valid: true, message: 'Email verified successfully!' });
};
