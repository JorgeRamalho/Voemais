import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { User, Movimentacao } from '../types'

const mockUser: User = {
  id: 'VM-2025-001',
  matricula: 'VM-2025-001',
  nome: 'Carlos',
  sobrenome: 'Silva',
  email: 'carlos.silva@email.com',
  telefone: '(11) 99999-8888',
  cpf: '123.456.789-00',
  dataNascimento: '15/06/1990',
  genero: 'Masculino',
  endereco: {
    cep: '01310-100',
    logradouro: 'Av. Paulista',
    numero: '1000',
    complemento: 'Apto 42',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP',
  },
  tipoSanguineo: 'O+',
  emergenciaContato: 'Maria Silva',
  emergenciaTelefone: '(11) 97777-6666',
  dataCadastro: '10/01/2025',
  plano: 'Premium',
  status: 'active',
}

const mockMovimentacoes: Movimentacao[] = [
  { id: 'MOV-001', data: '15/06/2025', descricao: 'Passagem GRU-JFK', tipo: 'debito', valor: 2450.00, status: 'Confirmado' },
  { id: 'MOV-002', data: '10/06/2025', descricao: 'Milhas bônus', tipo: 'credito', valor: 5000, status: 'Processado' },
  { id: 'MOV-003', data: '01/06/2025', descricao: 'Passagem SDU-CGH', tipo: 'debito', valor: 890.00, status: 'Confirmado' },
  { id: 'MOV-004', data: '28/05/2025', descricao: 'Milhas promocionais', tipo: 'credito', valor: 2000, status: 'Processado' },
  { id: 'MOV-005', data: '15/05/2025', descricao: 'Passagem GRU-LIS', tipo: 'debito', valor: 3800.00, status: 'Confirmado' },
]

function Dashboard() {
  const [user] = useState<User>(mockUser)

  return (
    <main className="main-content">
      <div className="container">
        <div className="dashboard">
          {/* Header */}
          <div className="dashboard-header">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1>Olá, {user.nome}!</h1>
                <p>Bem-vindo ao seu painel de controle</p>
              </div>
              <div className="flex gap-2">
                <span className={`status-badge ${user.status}`}>
                  {user.status === 'active' ? 'Ativo' : user.status}
                </span>
                <Link to="/" className="btn btn-outline btn-sm">Sair</Link>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="dashboard-grid">
            <div className="dashboard-card" style={{ gridColumn: 'span 2' }}>
              <div className="flex items-center gap-4">
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '1.5rem', fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {user.nome[0]}{user.sobrenome[0]}
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{user.nome} {user.sobrenome}</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    Matrícula: <strong>{user.matricula}</strong> &nbsp;|&nbsp; Plano: <strong>{user.plano}</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {user.email} &nbsp;|&nbsp; {user.telefone}
                  </p>
                </div>
              </div>
            </div>

            <div className="dashboard-card" style={{ textAlign: 'center' }}>
              <div className="dashboard-card-header" style={{ justifyContent: 'center' }}>
                <h3>🌟 Milhas</h3>
              </div>
              <div className="dashboard-card-value" style={{ color: 'var(--color-accent)' }}>12.450</div>
              <span className="dashboard-card-change positive">✈️ +2.000 este mês</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>👤 Dados Pessoais</h3>
                <Link to="/cadastro" className="text-sm" style={{ fontWeight: 600 }}>Editar</Link>
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                <div><strong>📄 CPF:</strong> {user.cpf}</div>
                <div><strong>🎂 Nascimento:</strong> {user.dataNascimento}</div>
                <div><strong>⚤ Gênero:</strong> {user.genero}</div>
                <div><strong>🩸 Tipo Sanguíneo:</strong> {user.tipoSanguineo}</div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>📍 Endereço</h3>
                <Link to="/cadastro" className="text-sm" style={{ fontWeight: 600 }}>Editar</Link>
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                <div>🏠 {user.endereco.logradouro}, {user.endereco.numero}{user.endereco.complemento ? ` - ${user.endereco.complemento}` : ''}</div>
                <div>📌 {user.endereco.bairro}, {user.endereco.cidade} - {user.endereco.estado}</div>
                <div><strong>📮 CEP:</strong> {user.endereco.cep}</div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>🆘 Emergência</h3>
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                <div><strong>👤 Contato:</strong> {user.emergenciaContato}</div>
                <div><strong>📞 Telefone:</strong> {user.emergenciaTelefone}</div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>📋 Cadastro</h3>
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                <div><strong>📅 Data:</strong> {user.dataCadastro}</div>
                <div><strong>🔖 Matrícula:</strong> {user.matricula}</div>
                <div><strong>✅ Status:</strong> <span className={`status-badge ${user.status}`}>Ativo</span></div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="dashboard-table" style={{ marginTop: '2rem' }}>
            <div className="dashboard-table-header">
              📊 Histórico de Movimentações
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>🔖 ID</th>
                    <th>📅 Data</th>
                    <th>✈️ Descrição</th>
                    <th>📌 Tipo</th>
                    <th>💰 Valor</th>
                    <th>✅ Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMovimentacoes.map((mov) => (
                    <tr key={mov.id}>
                      <td style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{mov.id}</td>
                      <td>{mov.data}</td>
                      <td>{mov.descricao}</td>
                      <td>
                        <span style={{
                          color: mov.tipo === 'credito' ? 'var(--color-success)' : 'var(--color-error)',
                          fontWeight: 600, textTransform: 'capitalize',
                        }}>
                          {mov.tipo === 'credito' ? '⬆ Crédito' : '⬇ Débito'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: mov.tipo === 'credito' ? 'var(--color-success)' : 'var(--color-error)' }}>
                        {mov.tipo === 'credito' ? '+ ' : '- '}R$ {mov.valor.toFixed(2).replace('.', ',')}
                      </td>
                      <td>
                        <span className={`status-badge ${mov.status === 'Confirmado' ? 'active' : 'pending'}`}>
                          {mov.status === 'Confirmado' ? '✅ Confirmado' : '⏳ Processado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
