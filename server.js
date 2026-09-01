// ============================================================================
// Auditor IBS/CBS — backend de consulta de NF-e/NFS-e
// ----------------------------------------------------------------------------
// Este servidor existe para fazer o que o frontend (GitHub Pages) NUNCA deve
// fazer sozinho: guardar credenciais (chave de API ou certificado digital) e
// falar diretamente com a SEFAZ/Receita ou com um provedor terceirizado.
//
// Estado atual: STUB. O endpoint abaixo responde 501 (não implementado) até
// que vocês decidam o provedor e preencham as credenciais no .env.
//
// Como implementar de verdade (duas opções — ver README.md da raiz):
//
//   OPÇÃO A — Provedor pago (recomendado para começar rápido)
//     Ex: Focus NFe, PlugNotas, eNotas, TecnoSpeed.
//     Você chama a API REST deles usando um token guardado em process.env,
//     e repassa o XML da nota para o frontend. Não lida com SOAP nem com
//     certificado digital diretamente — o provedor cuida disso.
//
//   OPÇÃO B — Webservice direto da SEFAZ com certificado A1/A3
//     Requer: biblioteca de assinatura digital (ex: node-forge, xml-crypto),
//     certificado .pfx carregado com segurança (nunca commitado no git),
//     chamadas SOAP para o webservice de cada UF, tratamento de ambiente
//     (produção/homologação). É consideravelmente mais complexo e você
//     assume a responsabilidade de manter o certificado seguro.
// ============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // em produção, restrinja para o domínio do seu GitHub Pages

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auditor-ibscbs-backend' });
});

app.get('/api/consultar-nfe', async (req, res) => {
  const numero = req.query.numero;
  if (!numero) {
    return res.status(400).json({ error: 'Parâmetro "numero" é obrigatório.' });
  }

  // ---- OPÇÃO A: exemplo de chamada a um provedor pago (comentado) ----------
  //
  // const resposta = await fetch(`https://api.focusnfe.com.br/v2/nfe/${numero}`, {
  //   headers: { Authorization: `Token token=${process.env.FOCUS_NFE_TOKEN}` }
  // });
  // if (!resposta.ok) {
  //   return res.status(resposta.status).json({ error: 'Erro ao consultar o provedor.' });
  // }
  // const xml = await resposta.text();
  // res.set('Content-Type', 'application/xml');
  // return res.send(xml);

  // ---- OPÇÃO B: chamada SOAP direta à SEFAZ (requer certificado) ----------
  //
  // const xml = await consultarSefazComCertificado(numero, chaveDeAcesso);
  // res.set('Content-Type', 'application/xml');
  // return res.send(xml);

  return res.status(501).json({
    error: 'Consulta ainda não implementada. Configure o provedor escolhido em server.js e no .env — veja README.md.'
  });
});

app.listen(PORT, () => {
  console.log(`Auditor IBS/CBS backend rodando na porta ${PORT}`);
});
