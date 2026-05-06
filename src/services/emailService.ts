export const emailService = {
  // Enviar email de verificación de cuenta
  enviarVerificacion: async (email: string, token: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`📧 Email de verificación enviado a: ${email}`);
    console.log(`🔗 Link: http://localhost:5173/verificar-email?token=${token}`);
  },

  // Enviar email de recuperación de contraseña
  enviarRecuperacion: async (email: string, token: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`📧 Email de recuperación enviado a: ${email}`);
    console.log(`🔗 Link para resetear contraseña: http://localhost:5173/resetear-password?token=${token}`);
  },
};
