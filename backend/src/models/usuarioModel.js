class Usuario {
  constructor(data) {
    this.id = data.id;
    this.mail = data.mail;
    this.contraseña = data.contraseña;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.numero_telefono = data.numero_telefono;
    this.fecha_nacimiento = data.fecha_nacimiento;
    this.edad = data.edad;
    this.rol = data.rol;
    this.activo = data.activo;
    this.dni = data.dni;
    this.sexo = data.sexo;
    this.direccion = data.direccion;
  }
}

module.exports = Usuario;
