export const emailService = {
  enviarVerificacion: async (email: string, token: string): Promise<void> => {
    // Simular delay de red (como si enviara un email real)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mostrar en consola el enlace de verificación (para pruebas)
    console.log(`Email de verificación enviado a: ${email}`);
    console.log(`Link de verificación: http://localhost:5173/verificar-email?token=${token}`);

    // En producción, aquí iría una llamada real a un servicio de email
    return;
  },
};
