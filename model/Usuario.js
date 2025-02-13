const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  email: String,
  genero: String,
  country: String,
  cpf: String,
  telefone: String,
  
  graficos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grafico',
    validate: {
      validator: function (v) {
        return this.graficos.length <= 3;
      },
      message: 'Nao mais que 3 graficos'
    }
  }]
});

module.exports = mongoose.model("Usuario", UserSchema);