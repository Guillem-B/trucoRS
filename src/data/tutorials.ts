import { Card } from './cards';

export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'interactive' | 'quiz';
  interactiveContent?: {
    cards?: Card[];
    question?: string;
    options?: string[];
    correctAnswer?: number;
    explanation?: string;
  };
}

export interface TutorialModule {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
}

export const tutorialModules: TutorialModule[] = [
  {
    id: 'card-hierarchy',
    title: 'Entendendo a Hierarquia das Cartas',
    description: 'Aprenda como as cartas são organizadas e comparadas no Truco Gaudério',
    steps: [
      {
        id: 'intro',
        title: 'Introdução ao Baralho',
        content: 'O Truco Gaudério usa um baralho de 44 cartas, sem os 8 e 9. O baralho tem 4 naipes: Ouros (moedas), Espadas (espadas), Copas (taças) e Bastos (paus).',
        type: 'text',
      },
      {
        id: 'manilhas-intro',
        title: 'O que são Manilhas?',
        content: 'No Truco Gaudério, as manilhas são fixas e não dependem de uma "vira". As 4 manilhas são: 1 de Espadas (a mais alta), 1 de Bastos, 7 de Espadas, e 7 de Ouros (a mais baixa das manilhas).',
        type: 'text',
      },
      {
        id: 'manilhas-order',
        title: 'Ordem das Manilhas',
        content: 'A ordem das manilhas é sempre: 1 de Espadas > 1 de Bastos > 7 de Espadas > 7 de Ouros. Esta ordem é fixa e não muda durante o jogo.',
        type: 'text',
      },
      {
         id: 'standard-hierarchy',
         title: 'Hierarquia Padrão',
         content: 'Após as manilhas, a hierarquia das cartas é: 3 (mais alta), 2, 1 de Copas = 1 de Ouros, Reis (K), Damas (Q), Valetes (J), 10s, 7 de Copas = 7 de Bastos, 6, 5, 4 (mais baixa).',
         type: 'text',
       },
      {
        id: 'card-comparison',
        title: 'Comparando Cartas',
        content: 'Quando duas cartas são jogadas na mesma rodada, a carta mais alta vence. Se ambas forem da mesma hierarquia, a primeira jogada vence (ou empata, dependendo da variação).',
        type: 'text',
      },
      {
        id: 'quiz-1',
        title: 'Teste seu Conhecimento',
        content: 'Vamos testar o que você aprendeu sobre a hierarquia das cartas.',
        type: 'quiz',
        interactiveContent: {
          question: 'Qual carta é mais alta: um 3 de Ouros ou um Ás de Copas?',
          options: [
            '3 de Ouros',
            'Ás de Copas',
            'São iguais',
            'Depende da vira',
          ],
          correctAnswer: 0,
          explanation: 'Correto! O 3 é a carta mais alta na hierarquia padrão (após as manilhas), então um 3 de qualquer naipe vence um Ás.',
        },
      },
      {
        id: 'quiz-2',
        title: 'Mais um Teste',
        content: 'Outra pergunta para reforçar seu aprendizado.',
        type: 'quiz',
        interactiveContent: {
          question: 'Qual é a ordem correta das cartas na hierarquia padrão (da mais alta para a mais baixa)?',
          options: [
            '3, 2, 1(copas=ouros), K, Q, J, 10, 7(copas=paus), 6, 5, 4',
            'A, K, Q, J, 10, 9, 8, 7, 6, 5, 4',
            '4, 5, 6, 7, 8, 9, 10, J, Q, K, A',
            '3, A, K, Q, J, 2, 7, 6, 5, 4',
          ],
          correctAnswer: 0,
          explanation: 'Correto! A hierarquia padrão (após as manilhas) é: 3 (mais alta), 2, 1 de Copas = 1 de Ouros, Reis (K), Damas (Q), Valetes (J), 10s, 7 de Copas = 7 de Bastos, 6, 5, 4 (mais baixa).',
        },
      },
    ],
  },
  {
    id: 'gameplay-flow',
    title: 'Fluxo Básico do Jogo',
    description: 'Aprenda como uma partida de Truco Gaudério funciona, do início ao fim',
    steps: [
      {
        id: 'intro-flow',
        title: 'Estrutura do Jogo',
        content: 'Uma partida de Truco Gaudério é dividida em mãos. Cada mão tem 3 rodadas. O time que vencer 2 rodadas vence a mão e marca pontos.',
        type: 'text',
      },
      {
        id: 'rounds',
        title: 'Rodadas',
        content: 'Em cada rodada, os jogadores jogam uma carta. A carta mais alta vence a rodada. O time que vencer 2 rodadas vence a mão.',
        type: 'text',
      },
      {
        id: 'scoring',
        title: 'Pontuação',
        content: 'Cada mão vencida vale pontos. Por padrão, uma mão vale 1 ponto. Mas os pontos podem ser aumentados através dos desafios: Truco (2 pontos), Retruco (3 pontos) ou Vale Quatro (4 pontos).',
        type: 'text',
      },
      {
        id: 'winning',
        title: 'Condição de Vitória',
        content: 'O primeiro time a alcançar 12 pontos vence a partida. Em algumas variações, é necessário vencer por 2 pontos de diferença.',
        type: 'text',
      },
      {
        id: 'quiz-flow',
        title: 'Teste seu Conhecimento',
        content: 'Vamos verificar se você entendeu o fluxo do jogo.',
        type: 'quiz',
        interactiveContent: {
          question: 'Quantas rodadas tem uma mão?',
          options: [
            '1 rodada',
            '2 rodadas',
            '3 rodadas',
            '4 rodadas',
          ],
          correctAnswer: 2,
          explanation: 'Correto! Cada mão tem exatamente 3 rodadas. O time que vencer 2 rodadas vence a mão.',
        },
      },
    ],
  },
  {
    id: 'betting-strategies',
    title: 'Estratégias de Apostas',
    description: 'Aprenda quando e como usar os desafios (Truco, Retruco, Vale Quatro)',
    steps: [
      {
        id: 'betting-intro',
        title: 'O que são Desafios?',
        content: 'Os desafios (Truco, Retruco, Vale Quatro) aumentam o valor dos pontos da mão. Você só pode desafiar na sua vez, antes de jogar sua carta.',
        type: 'text',
      },
      {
        id: 'when-to-bet',
        title: 'Quando Desafiar',
        content: 'Desafie quando você tem uma boa mão e confia que pode vencer. Desafiar com cartas fracas pode ser arriscado, pois se o oponente aceitar e você perder, ele marca mais pontos.',
        type: 'text',
      },
      {
        id: 'accept-or-decline',
        title: 'Aceitar ou Recusar',
        content: 'Se o oponente desafiar, você pode aceitar (e continuar jogando com pontos aumentados) ou recusar (e perder a mão imediatamente, mas o oponente marca os pontos do desafio).',
        type: 'text',
      },
      {
        id: 'betting-tips',
        title: 'Dicas de Apostas',
        content: 'Use Truco para testar a confiança do oponente. Se ele aceitar facilmente, pode ter uma boa mão. Se recusar, você ganha pontos sem risco.',
        type: 'text',
      },
      {
        id: 'quiz-betting',
        title: 'Teste seu Conhecimento',
        content: 'Vamos verificar seu entendimento sobre apostas.',
        type: 'quiz',
        interactiveContent: {
          question: 'Quantos pontos vale uma mão com "Vale Quatro" aceito?',
          options: [
            '1 ponto',
            '2 pontos',
            '3 pontos',
            '4 pontos',
          ],
          correctAnswer: 3,
          explanation: 'Correto! Vale Quatro aumenta o valor da mão para 4 pontos. Se aceito e você vencer, marca 4 pontos. Se recusar, o oponente marca 4 pontos.',
        },
      },
    ],
  },
  {
    id: 'winning-strategies',
    title: 'Estratégias para Vencer',
    description: 'Aprenda técnicas avançadas para melhorar suas chances de vitória',
    steps: [
      {
        id: 'card-management',
        title: 'Gerenciamento de Cartas',
        content: 'Economize suas cartas fortes para quando realmente precisar. Jogue cartas baixas nas primeiras rodadas quando possível, guardando as melhores para momentos decisivos.',
        type: 'text',
      },
      {
        id: 'reading-opponents',
        title: 'Ler o Oponente',
        content: 'Observe como o oponente joga. Se ele desafia com Truco logo no início, provavelmente tem uma boa mão. Se hesita ou recusa desafios, pode estar com cartas fracas.',
        type: 'text',
      },
      {
        id: 'bluffing',
        title: 'Bluffing',
        content: 'Às vezes, desafiar com uma mão não tão forte pode fazer o oponente recusar, dando-lhe pontos sem risco. Mas use com moderação - se ele aceitar e você perder, você perde mais pontos.',
        type: 'text',
      },
      {
        id: 'manilhas',
        title: 'Usando Manilhas',
        content: 'No Truco Gaudério, as manilhas (1 de Espadas, 1 de Bastos, 7 de Espadas, 7 de Ouros) são suas cartas mais poderosas. Use-as estrategicamente - às vezes é melhor guardá-las para quando realmente precisar vencer uma rodada importante.',
        type: 'text',
      },
      {
        id: 'quiz-strategies',
        title: 'Teste seu Conhecimento',
        content: 'Vamos verificar se você entendeu as estratégias.',
        type: 'quiz',
        interactiveContent: {
          question: 'Qual é uma boa estratégia para gerenciar suas cartas?',
          options: [
            'Sempre jogar a carta mais alta primeiro',
            'Economizar cartas fortes para momentos decisivos',
            'Jogar todas as cartas altas na primeira rodada',
            'Nunca desafiar o oponente',
          ],
          correctAnswer: 1,
          explanation: 'Correto! Economizar cartas fortes permite que você tenha opções melhores nas rodadas posteriores, quando a mão está mais definida.',
        },
      },
    ],
  },
  {
    id: 'flor-tutorial',
    title: 'Flor - Sistema Especial',
    description: 'Aprenda sobre o sistema de Flor, uma declaração especial baseada em cartas do mesmo naipe',
    steps: [
      {
        id: 'flor-intro',
        title: 'Introdução à Flor',
        content: 'Flor é uma declaração especial que pode ser feita quando você tem três cartas do mesmo naipe. É uma adição opcional ao Truco Gaudério que adiciona estratégia extra ao jogo.',
        type: 'text',
      },
      {
        id: 'flor-definition',
        title: 'O que é Flor?',
        content: 'Flor ocorre quando você recebe três cartas do mesmo naipe na distribuição inicial. Por exemplo: três cartas de Ouros, três de Copas, etc. Qualquer naipe serve, desde que todas as três cartas sejam do mesmo.',
        type: 'text',
      },
      {
        id: 'flor-value',
        title: 'Como Calcular o Valor da Flor',
        content: 'O valor da Flor é calculado somando os valores das cartas + 20 pontos base. As regras são: Cartas numéricas valem seu número (2=2, 3=3, etc.), Ás vale 1, e cartas de face (10, Valete, Dama, Rei) valem 0.',
        type: 'text',
      },
      {
        id: 'flor-examples',
        title: 'Exemplos de Flor',
        content: 'Uma Flor de 7, 6, 5 de Ouros vale 7+6+5+20 = 38 pontos. Uma Flor de Ás, Rei, Dama de Copas vale 1+0+0+20 = 21 pontos.',
        type: 'text',
      },
      {
        id: 'flor-declaration',
        title: 'Declarando Flor',
        content: 'Você pode declarar "Flor" no início da mão, antes de jogar qualquer carta. O oponente pode então aceitar (comparar Flors) ou recusar (conceder os pontos a você).',
        type: 'text',
      },
      {
        id: 'flor-comparison',
        title: 'Comparando Flors',
        content: 'Se ambos os jogadores tiverem Flor, vence quem tiver o maior valor. Se os valores forem iguais, é empate e ninguém marca pontos.',
        type: 'text',
      },
      {
        id: 'flor-points',
        title: 'Pontos da Flor',
        content: 'Flor vale 3 pontos. Se você declarar Flor e o oponente aceitar, quem vencer marca 3 pontos. Se o oponente recusar, você marca 3 pontos imediatamente.',
        type: 'text',
      },
      {
        id: 'flor-strategy',
        title: 'Estratégia com Flor',
        content: 'Flor forte (alta pontuação) deve ser declarada rapidamente. Flor fraca pode esperar ou até ser mantida em segredo. Considere a força da sua mão normal também!',
        type: 'text',
      },
      {
        id: 'flor-quiz',
        title: 'Teste seu Conhecimento sobre Flor',
        content: 'Vamos verificar se você entendeu o sistema de Flor.',
        type: 'quiz',
        interactiveContent: {
          question: 'Qual é o valor de uma Flor com cartas 7, 6 e 4 de Espadas?',
          options: [
            '37 pontos (7+6+4+20)',
            '17 pontos (7+6+4)',
            '27 pontos (7+6+4+10)',
            '47 pontos (7+6+4+30)',
          ],
          correctAnswer: 0,
          explanation: 'Correto! 7+6+4 = 17, mais 20 pontos base = 37 pontos totais.',
        },
      },
    ],
  },
];

export function getTutorialProgress(): Record<string, number> {
  const stored = localStorage.getItem('tutorialProgress');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}

export function saveTutorialProgress(moduleId: string, stepIndex: number): void {
  const progress = getTutorialProgress();
  progress[moduleId] = stepIndex;
  localStorage.setItem('tutorialProgress', JSON.stringify(progress));
}

export function getModuleProgress(moduleId: string): number {
  const progress = getTutorialProgress();
  return progress[moduleId] || 0;
}

