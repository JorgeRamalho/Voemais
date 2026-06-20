export interface User {
  id: string;
  matricula: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  genero: string;
  endereco: Endereco;
  tipoSanguineo: string;
  emergenciaContato: string;
  emergenciaTelefone: string;
  dataCadastro: string;
  plano: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface LoginData {
  email: string;
  senha: string;
  remember: boolean;
}

export interface RegisterData {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  genero: string;
  senha: string;
  confirmarSenha: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  tipoSanguineo: string;
  emergenciaContato: string;
  emergenciaTelefone: string;
  plano: string;
  termos: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export type PlanoVoo = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  beneficios: string[];
};

export type Movimentacao = {
  id: string;
  data: string;
  descricao: string;
  tipo: 'credito' | 'debito';
  valor: number;
  status: string;
};
