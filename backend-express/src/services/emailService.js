exports.sendResetEmail = async (toEmail, token) => {
  console.log(`[FAKE EMAIL] Password reset link for ${toEmail}: http://localhost:3000/reset-password?token=${token}`);
};
