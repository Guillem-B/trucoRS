export interface StrategySection {
  id: string;
  title: string;
  content: string;
  subsections?: StrategySection[];
}

export const strategiesData: StrategySection[] = [
  {
    id: 'card-counting',
    title: 'Técnicas de Contagem de Cartas',
    content: 'Embora não seja possível contar todas as cartas como em blackjack, você pode rastrear quais cartas já foram jogadas para ter uma ideia do que o oponente pode ter.',
    subsections: [
      {
        id: 'tracking-played',
        title: 'Rastrear Cartas Jogadas',
        content: 'Mantenha mentalmente uma lista das cartas que já foram jogadas. Isso ajuda a estimar quais cartas o oponente ainda pode ter em mãos.',
      },
      {
        id: 'manilha-tracking',
        title: 'Rastrear Manilhas',
        content: 'As manilhas são as cartas mais importantes. Se você já viu algumas manilhas serem jogadas, sabe que o oponente tem menos opções poderosas restantes.',
      },
    ],
  },
  {
    id: 'bluffing',
    title: 'Estratégias de Blefe',
    content: 'Blefar é uma parte importante do Truco. Aprenda quando e como blefar efetivamente.',
    subsections: [
      {
        id: 'when-to-bluff',
        title: 'Quando Blefar',
        content: 'Blefe quando você tem uma mão mediana e quer testar a confiança do oponente. Um Truco bem-timed pode fazer o oponente recusar, dando-lhe pontos sem risco.',
      },
      {
        id: 'bluffing-tips',
        title: 'Dicas de Blefe',
        content: 'Não blefe muito frequentemente - oponentes experientes vão perceber. Varie sua estratégia para manter o oponente adivinhando.',
      },
    ],
  },
  {
    id: 'betting-psychology',
    title: 'Psicologia das Apostas',
    content: 'Entender a psicologia por trás das apostas pode dar-lhe uma vantagem significativa.',
    subsections: [
      {
        id: 'reading-bets',
        title: 'Ler as Apostas do Oponente',
        content: 'Se o oponente desafia com Truco logo no início, provavelmente tem uma mão forte. Se hesita ou só desafia quando está ganhando, pode estar inseguro.',
      },
      {
        id: 'betting-patterns',
        title: 'Padrões de Aposta',
        content: 'Observe os padrões do oponente. Alguns jogadores sempre desafiam com boas mãos, outros blefam frequentemente. Adapte sua estratégia de acordo.',
      },
    ],
  },
  {
    id: 'reading-opponents',
    title: 'Ler o Oponente',
    content: 'Observar e interpretar o comportamento do oponente pode revelar informações valiosas sobre sua mão.',
    subsections: [
      {
        id: 'timing',
        title: 'Timing das Jogadas',
        content: 'Jogadores com mãos fortes geralmente jogam mais rápido. Hesitação pode indicar indecisão ou cartas fracas.',
      },
      {
        id: 'card-selection',
        title: 'Seleção de Cartas',
        content: 'Observe qual carta o oponente escolhe jogar. Se ele sempre joga a carta mais baixa primeiro, pode estar economizando cartas fortes.',
      },
    ],
  },
  {
    id: 'common-patterns',
    title: 'Padrões Comuns e Contra-Estratégias',
    content: 'Reconhecer padrões comuns de jogo e saber como contra-atacar é essencial para o sucesso.',
    subsections: [
      {
        id: 'aggressive-players',
        title: 'Jogadores Agressivos',
        content: 'Jogadores que sempre desafiam podem ser contidos aceitando seus desafios quando você tem uma boa mão, forçando-os a jogar com mais cuidado.',
      },
      {
        id: 'conservative-players',
        title: 'Jogadores Conservadores',
        content: 'Jogadores que raramente desafiam podem ser pressionados com desafios frequentes, especialmente quando você tem uma mão forte.',
      },
    ],
  },
];

