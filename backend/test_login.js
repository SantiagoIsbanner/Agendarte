const bcrypt = require('bcryptjs');

// Verificar contraseñas
const testPasswords = async () => {
  const adminHash = '$2b$10$8K1p/a0dclxnGiGzb2WOL.eMhAkNFX8iJJ1aIkVFcPVMNiRW6hniq';
  const pacienteHash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  
  console.log('Testing admin password:');
  console.log('admin vs hash:', await bcrypt.compare('admin', adminHash));
  
  console.log('Testing paciente password:');
  console.log('paciente123 vs hash:', await bcrypt.compare('paciente123', pacienteHash));
  
  // Generar hash correcto para admin
  const correctAdminHash = await bcrypt.hash('admin', 10);
  console.log('Correct admin hash:', correctAdminHash);
};

testPasswords();