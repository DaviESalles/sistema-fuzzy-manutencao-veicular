const form = document.getElementById("maintenanceForm");
const resultado = document.getElementById("resultado");
const prioridadeTexto = document.getElementById("prioridadeTexto");
const pontuacao = document.getElementById("pontuacao");
const justificativa = document.getElementById("justificativa");
const pertinencias = document.getElementById("pertinencias");
const barFill = document.getElementById("barFill");

/**
 * Função de pertinência triangular/trapezoidal simplificada.
 * Retorna um grau entre 0 e 1.
 */
function pertinencia(valor, inicio, picoInicio, picoFim, fim) {
  if (valor <= inicio || valor >= fim) return 0;
  if (valor >= picoInicio && valor <= picoFim) return 1;
  if (valor > inicio && valor < picoInicio) {
    return (valor - inicio) / (picoInicio - inicio);
  }
  if (valor > picoFim && valor < fim) {
    return (fim - valor) / (fim - picoFim);
  }
  return 0;
}

function calcularGraus(km, tempo, desgaste, criticidade, sintomas) {
  return {
    kmBaixa: pertinencia(km, 0, 0, 5000, 9000),
    kmModerada: pertinencia(km, 5000, 9000, 13000, 17000),
    kmAlta: pertinencia(km, 12000, 17000, 22000, 28000),
    kmCritica: pertinencia(km, 22000, 30000, 50000, 70000),

    tempoRecente: pertinencia(tempo, 0, 0, 3, 6),
    tempoNormal: pertinencia(tempo, 3, 6, 9, 12),
    tempoAtrasado: pertinencia(tempo, 9, 12, 16, 20),
    tempoVencido: pertinencia(tempo, 16, 20, 36, 48),

    desgasteBaixo: pertinencia(desgaste, 0, 0, 2, 4),
    desgasteMedio: pertinencia(desgaste, 2, 4, 6, 8),
    desgasteAlto: pertinencia(desgaste, 6, 8, 10, 11),

    criticidadeBaixa: pertinencia(criticidade, 0, 1, 2, 4),
    criticidadeMedia: pertinencia(criticidade, 2, 4, 5, 7),
    criticidadeAlta: pertinencia(criticidade, 5, 7, 8, 10),
    criticidadeVital: pertinencia(criticidade, 8, 10, 10, 11),

    sintomasAusentes: pertinencia(sintomas, -1, 0, 0, 2),
    sintomasLeves: pertinencia(sintomas, 1, 3, 3, 5),
    sintomasModerados: pertinencia(sintomas, 4, 6, 6, 8),
    sintomasSeveros: pertinencia(sintomas, 7, 10, 10, 11)
  };
}

/**
 * Inferência fuzzy simplificada.
 * Cada regra gera uma contribuição para a pontuação final.
 */
function aplicarRegras(g) {
  const regras = [];

  regras.push({
    nome: "Quilometragem crítica ou tempo vencido aumentam a prioridade.",
    grau: Math.max(g.kmCritica, g.tempoVencido),
    peso: 90
  });

  regras.push({
    nome: "Desgaste alto combinado com sintomas severos indica risco crítico.",
    grau: Math.min(g.desgasteAlto, g.sintomasSeveros),
    peso: 100
  });

  regras.push({
    nome: "Componente vital com manutenção atrasada exige prioridade elevada.",
    grau: Math.min(g.criticidadeVital, Math.max(g.tempoAtrasado, g.tempoVencido)),
    peso: 95
  });

  regras.push({
    nome: "Quilometragem alta e criticidade alta indicam prioridade alta.",
    grau: Math.min(g.kmAlta, g.criticidadeAlta),
    peso: 80
  });

  regras.push({
    nome: "Sintomas moderados em componente de média ou alta criticidade exigem atenção.",
    grau: Math.min(g.sintomasModerados, Math.max(g.criticidadeMedia, g.criticidadeAlta)),
    peso: 70
  });

  regras.push({
    nome: "Baixa quilometragem, pouco desgaste e ausência de sintomas reduzem a prioridade.",
    grau: Math.min(g.kmBaixa, g.desgasteBaixo, g.sintomasAusentes),
    peso: 20
  });

  regras.push({
    nome: "Condição intermediária gera prioridade média.",
    grau: Math.max(g.kmModerada, g.tempoNormal, g.desgasteMedio),
    peso: 50
  });

  const somaPesos = regras.reduce((total, regra) => total + regra.grau, 0);

  if (somaPesos === 0) {
    return {
      score: 35,
      regrasAtivadas: []
    };
  }

  const score =
    regras.reduce((total, regra) => total + regra.grau * regra.peso, 0) / somaPesos;

  const regrasAtivadas = regras
    .filter((regra) => regra.grau > 0.1)
    .sort((a, b) => b.grau - a.grau);

  return {
    score,
    regrasAtivadas
  };
}

function classificarPrioridade(score) {
  if (score < 35) return "Baixa";
  if (score < 60) return "Média";
  if (score < 80) return "Alta";
  return "Crítica";
}

function gerarJustificativa(tipo, prioridade, score, regrasAtivadas) {
  let texto = `A manutenção analisada foi "${tipo}". O sistema classificou a prioridade como ${prioridade.toLowerCase()}, com pontuação aproximada de ${score.toFixed(1)} em uma escala de 0 a 100. `;

  if (regrasAtivadas.length > 0) {
    texto += "Os principais fatores considerados foram: ";
    texto += regrasAtivadas
      .slice(0, 3)
      .map((regra) => regra.nome.toLowerCase())
      .join(" ");
  } else {
    texto += "Nenhuma condição crítica foi identificada, portanto a prioridade foi definida com base em uma condição geral de atenção preventiva.";
  }

  if (prioridade === "Crítica") {
    texto += " Recomenda-se avaliar essa manutenção com urgência, pois há combinação de fatores associados a risco elevado.";
  } else if (prioridade === "Alta") {
    texto += " Recomenda-se priorizar essa manutenção antes de itens menos críticos.";
  } else if (prioridade === "Média") {
    texto += " A manutenção merece acompanhamento, mas não indica urgência máxima no cenário informado.";
  } else {
    texto += " A manutenção pode ser acompanhada de forma preventiva, sem indicação de urgência no cenário informado.";
  }

  return texto;
}

function limparClassesResultado() {
  resultado.classList.remove("baixa", "media", "alta", "critica");
}

function classeCssPrioridade(prioridade) {
  return prioridade
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const km = Number(document.getElementById("km").value);
  const tempo = Number(document.getElementById("tempo").value);
  const desgaste = Number(document.getElementById("desgaste").value);
  const criticidade = Number(document.getElementById("criticidade").value);
  const sintomas = Number(document.getElementById("sintomas").value);

  const graus = calcularGraus(km, tempo, desgaste, criticidade, sintomas);
  const inferencia = aplicarRegras(graus);
  const score = Math.max(0, Math.min(100, inferencia.score));
  const prioridade = classificarPrioridade(score);

  prioridadeTexto.textContent = prioridade;
  pontuacao.textContent = score.toFixed(1);
  justificativa.textContent = gerarJustificativa(
    tipo,
    prioridade,
    score,
    inferencia.regrasAtivadas
  );

  pertinencias.innerHTML = "";

  const principaisGraus = [
    ["Quilometragem baixa", graus.kmBaixa],
    ["Quilometragem moderada", graus.kmModerada],
    ["Quilometragem alta", graus.kmAlta],
    ["Quilometragem crítica", graus.kmCritica],
    ["Tempo recente", graus.tempoRecente],
    ["Tempo normal", graus.tempoNormal],
    ["Tempo atrasado", graus.tempoAtrasado],
    ["Tempo vencido", graus.tempoVencido],
    ["Desgaste baixo", graus.desgasteBaixo],
    ["Desgaste médio", graus.desgasteMedio],
    ["Desgaste alto", graus.desgasteAlto],
    ["Sintomas ausentes", graus.sintomasAusentes],
    ["Sintomas leves", graus.sintomasLeves],
    ["Sintomas moderados", graus.sintomasModerados],
    ["Sintomas severos", graus.sintomasSeveros]
  ];

  principaisGraus
    .filter(([, valor]) => valor > 0)
    .forEach(([nome, valor]) => {
      const item = document.createElement("li");
      item.textContent = `${nome}: ${valor.toFixed(2)}`;
      pertinencias.appendChild(item);
    });

  limparClassesResultado();
  resultado.classList.add(classeCssPrioridade(prioridade));
  resultado.classList.remove("hidden");

  barFill.style.width = `${score}%`;
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
});