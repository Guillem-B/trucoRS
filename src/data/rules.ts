import { Card } from './cards';

export interface RuleSection {
  id: string;
  title: string;
  content: string;
  examples?: Card[][];
  subsections?: RuleSection[];
}

export const rulesData: RuleSection[] = [
  {
    id: 'hierarchy',
    title: 'Hierarquia das Cartas',
    content: 'No Truco Gaudério, as manilhas são fixas (não existe "vira"). A ordem de força das cartas é: 1. Espada (1 de Espadas), 2. Pauzão (1 de Paus), 3. Espadão (7 de Espadas), 4. Sete Belo (7 de Ouros). Depois seguem: todos os 3s, todos os 2s, 1 de Copas = 1 de Ouros, todos os Reis, todas as Damas (Q), todos os Valetes (J), 7 de Copas = 7 de Paus, todos os 6s, todos os 5s, todos os 4s.'
  },
  {
    id: 'envido',
    title: 'Envido',
    content: 'O Envido é uma aposta sobre quem tem a maior pontuação na mão inicial, antes de jogar as cartas. Pontuação: Cartas do mesmo naipe somam seus valores + 20. Figuras (10, 11, 12) valem 0 para a soma. Se tiver naipes diferentes, vale a carta mais alta isolada. O máximo é 33 (7+6 do mesmo naipe + 20).'
  },
  {
    id: 'gameplay-flow',
    title: 'Fluxo do Jogo',
    content: 'O Truco Gaudério é jogado em rodadas. Cada rodada tem 3 mãos, e cada mão tem 3 rodadas de cartas.',
    subsections: [
      {
        id: 'rounds',
        title: 'Rodadas',
        content: 'Cada rodada, os jogadores jogam uma carta. A carta mais alta vence a rodada. O jogador que vencer 2 rodadas vence a mão.',
      },
      {
        id: 'hands',
        title: 'Mãos',
        content: 'Uma mão consiste em 3 rodadas. O jogador que vencer 2 rodadas vence a mão e marca pontos.',
      },
      {
        id: 'game',
        title: 'Partida',
        content: 'Uma partida é disputada até que um time alcance 12 pontos (ou outro limite combinado).',
      },
    ],
  },
  {
    id: 'scoring',
    title: 'Sistema de Pontuação',
    content: 'Os pontos são marcados quando um time vence uma mão. O valor dos pontos pode ser aumentado através dos desafios (truco, retruco, vale quatro).',
    subsections: [
      {
        id: 'base-points',
        title: 'Pontos Base',
        content: 'Uma mão vencida vale 1 ponto por padrão. Se houver empate (1-1 nas rodadas), ninguém marca pontos.',
      },
      {
        id: 'challenges',
        title: 'Desafios',
        content: 'Os desafios aumentam o valor dos pontos: Truco (2 pontos), Retruco (3 pontos), Vale Quatro (4 pontos).',
      },
    ],
  },
  {
    id: 'betting',
    title: 'Mecânica de Apostas (Desafios)',
    content: 'Durante o jogo, os jogadores podem desafiar os oponentes, aumentando o valor da mão.',
    subsections: [
      {
        id: 'truco',
        title: 'Truco',
        content: 'O jogador que está jogando pode dizer "Truco", aumentando o valor da mão para 2 pontos. O oponente pode aceitar ou recusar. Se recusar, perde a mão e o desafiante marca os pontos.',
      },
      {
        id: 'retruco',
        title: 'Retruco',
        content: 'Se o Truco foi aceito, o oponente pode responder com "Retruco", aumentando para 3 pontos. O desafiante original pode aceitar ou recusar.',
      },
      {
        id: 'vale-quatro',
        title: 'Vale Quatro',
        content: 'Se o Retruco foi aceito, o desafiante original pode responder com "Vale Quatro", aumentando para 4 pontos. O oponente pode aceitar ou recusar.',
      },
      {
        id: 'betting-rules',
        title: 'Regras dos Desafios',
        content: 'Os desafios só podem ser feitos na vez do jogador. Não é possível desafiar após jogar a carta. O desafio deve ser respondido antes de jogar a próxima carta.',
      },
    ],
  },
  {
    id: 'winning-conditions',
    title: 'Condições de Vitória',
    content: 'A partida é vencida quando um time alcança 12 pontos (ou o limite combinado).',
    subsections: [
      {
        id: 'hand-winner',
        title: 'Vencedor da Mão',
        content: 'Vence a mão o time que ganhar 2 das 3 rodadas. Em caso de empate (1-1), ninguém marca pontos.',
      },
      {
        id: 'game-winner',
        title: 'Vencedor da Partida',
        content: 'Vence a partida o time que primeiro alcançar 12 pontos. Em algumas variações, pode ser necessário vencer por 2 pontos de diferença.',
      },
    ],
  },
  {
    id: 'flor',
    title: 'Flor',
    content: 'Flor é uma declaração especial que pode ser feita quando um jogador tem três cartas do mesmo naipe. É uma adição opcional ao Truco Gaudério, inspirada em outras variações do jogo.',
    subsections: [
      {
        id: 'flor-definition',
        title: 'O que é Flor?',
        content: 'Flor ocorre quando um jogador recebe três cartas do mesmo naipe na distribuição inicial. O jogador pode declarar "Flor" antes de jogar qualquer carta.',
      },
      {
        id: 'flor-value',
        title: 'Valor da Flor',
        content: 'O valor da Flor é calculado somando os valores das cartas do mesmo naipe + 20 pontos base. Cartas de face (10, J, Q, K) valem 0, Ás vale 1, e números valem seu valor facial.',
      },
      {
        id: 'flor-challenge',
        title: 'Desafiando a Flor',
        content: 'Quando um jogador declara Flor, o oponente pode aceitar (comparar Flors) ou recusar (conceder os pontos da Flor ao desafiante). Se ambos tiverem Flor, vence quem tiver o maior valor.',
      },
      {
        id: 'flor-points',
        title: 'Pontos da Flor',
        content: 'Flor vale 3 pontos. Se o desafio for aceito e você vencer, marca 3 pontos. Se for recusado, o oponente marca 3 pontos.',
      },
    ],
  },
  {
    id: 'special-situations',
    title: 'Situações Especiais',
    content: 'Existem algumas situações especiais no Truco Gaudério que merecem atenção.',
    subsections: [
      {
        id: 'manilhas',
        title: 'Manilhas',
        content: 'As manilhas são sempre as cartas mais altas, independentemente do naipe. Entre manilhas, a ordem é: Ouros < Espadas < Copas < Paus.',
      },
      {
        id: 'ties',
        title: 'Empates',
        content: 'Se duas cartas iguais forem jogadas na mesma rodada, a primeira carta jogada vence (ou pode ser considerado empate, dependendo da variação).',
      },
    ],
  },
];

export function searchRules(query: string): RuleSection[] {
  const lowerQuery = query.toLowerCase();
  return rulesData.filter(rule => 
    rule.title.toLowerCase().includes(lowerQuery) ||
    rule.content.toLowerCase().includes(lowerQuery) ||
    rule.subsections?.some(sub => 
      sub.title.toLowerCase().includes(lowerQuery) ||
      sub.content.toLowerCase().includes(lowerQuery)
    )
  );
}

