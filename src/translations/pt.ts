export const ptTranslations = {
  // Navigation
  'nav.home': 'Início',
  'nav.rules': 'Regras',
  'nav.tutorial': 'Tutorial',
  'nav.practice': 'Prática',
  'nav.strategy': 'Estratégias',
  'nav.statistics': 'Estatísticas',
  'nav.back': 'Voltar para o início',

  // Home page
  'home.title': 'TrucoRS',
  'home.subtitle': 'Aprenda a jogar Truco Gaudério - o jogo de cartas tradicional do Rio Grande do Sul',
  'home.deck.title': 'Baralho de Truco (44 cartas)',

  // Rules page
  'rules.title': 'Regras do Truco Gaudério',
  'rules.subtitle': 'Referência completa das regras e mecânicas do jogo',
  'rules.search.placeholder': 'Buscar nas regras...',
  'rules.no.results': 'Nenhuma regra encontrada para',

  // Game board
  'game.title': 'Truco Gaudério',
  'game.hand': 'Mão',
  'game.round': 'Rodada',
  'game.score': 'Placar',
  'game.opponent': 'Oponente',
  'game.player.hand': 'Sua Mão',
  'game.player.turn': 'É a vez de',
  'game.player.name': 'Você',
  'game.opponent1.name': 'Oponente 1',
  'game.opponent2.name': 'Oponente 2',
  'game.opponent3.name': 'Oponente 3',
  'game.has.flor': 'Tem Flor',
  'game.flor.value': 'Flor: {value} pontos',
  'game.card.played': 'Carta jogada',
  'game.hand.end': 'Mão Finalizada!',
  'game.game.end': 'Fim de Jogo!',
  'game.hand.won': 'Você venceu a mão!',
  'game.hand.lost': 'O oponente venceu a mão!',
  'game.game.won': '🎉 Você venceu a partida! 🎉',
  'game.game.lost': 'O oponente venceu a partida.',
  'game.next.round': 'Próxima Rodada',
  'game.next.hand': 'Próxima Mão',
  'game.reset': 'Reiniciar Jogo',
  'game.start': 'Iniciar Jogo',
  'game.played.cards': 'Cartas Jogadas',
  'game.waiting.cards': 'Aguardando cartas serem jogadas...',
  'game.round.winner': 'Vencedor da rodada',

  // Betting
  'bet.truco': 'Truco',
  'bet.retruco': 'Retruco',
  'bet.vale.quatro': 'Vale Quatro',
  'bet.accept': 'Aceitar',
  'bet.decline': 'Recusar',

  // Rules content
  'rules.hierarchy.title': 'Hierarquia das Cartas',
  'rules.hierarchy.content': 'No Truco Gaudério, as manilhas são fixas (não existe "vira").\n\nA ordem de força das cartas é:\n1. Espadão (1 de Espadas)\n2. Bastião (1 de Paus)\n3. 7 de Espadas\n4. 7 de Ouros\n\nDepois seguem: todos os 3s, todos os 2s, 1 de Copas = 1 de Ouros, todos os Reis, todas as Damas (Q), todos os Valetes (J), 7 de Copas = 7 de Paus, todos os 6s, todos os 5s, todos os 4s.',

  'rules.envido.title': 'Envido',
  'rules.envido.content': 'O Envido é uma aposta sobre quem tem a maior pontuação na mão inicial, antes de jogar as cartas.\n\nPontuação:\n• Cartas do mesmo naipe somam seus valores + 20\n• Figuras (10, 11, 12) valem 0 para a soma\n• Se tiver naipes diferentes, vale a carta mais alta isolada\n\nO máximo é 33 (7+6 do mesmo naipe + 20).',

  'rules.flow.title': 'Fluxo do Jogo',
  'rules.flow.content': 'O Truco Gaudério é jogado em mãos. Cada mão tem 3 rodadas, e cada jogador recebe 3 cartas no início da mão.',
  'rules.flow.hands.title': 'Mãos',
  'rules.flow.hands.content': 'Uma mão começa com cada jogador recebendo 3 cartas. Consiste em até 3 rodadas. O jogador que vencer 2 rodadas vence a mão e marca pontos.',
  'rules.flow.game.title': 'Partida',
  'rules.flow.game.content': 'Uma partida é disputada até que um time alcance 12 pontos (ou outro limite combinado).',

  'rules.scoring.title': 'Sistema de Pontuação',
  'rules.scoring.content': 'Os pontos são marcados quando um time vence uma mão. O valor dos pontos pode ser aumentado através dos desafios (truco, retruco, vale quatro).',
  'rules.scoring.base.title': 'Pontos Base',
  'rules.scoring.base.content': 'Uma mão vencida vale 1 ponto por padrão. Se houver empate (1-1 nas rodadas), ninguém marca pontos.',
  'rules.scoring.challenges.title': 'Desafios',
  'rules.scoring.challenges.content': 'Os desafios aumentam o valor dos pontos: Truco (2 pontos), Retruco (3 pontos), Vale Quatro (4 pontos).',

  'rules.betting.title': 'Mecânica de Apostas (Desafios)',
  'rules.betting.content': 'Durante o jogo, os jogadores podem desafiar os oponentes, aumentando o valor da mão.',
  'rules.betting.truco.title': 'Truco',
  'rules.betting.truco.content': 'O jogador que está jogando pode dizer "Truco", aumentando o valor da mão para 2 pontos. O oponente pode aceitar ou recusar. Se recusar, perde a mão e o desafiante marca os pontos.',
  'rules.betting.retruco.title': 'Retruco',
  'rules.betting.retruco.content': 'Se o Truco foi aceito, o oponente pode responder com "Retruco", aumentando para 3 pontos. O desafiante original pode aceitar ou recusar.',
  'rules.betting.vale.quatro.title': 'Vale Quatro',
  'rules.betting.vale.quatro.content': 'Se o Retruco foi aceito, o desafiante original pode responder com "Vale Quatro", aumentando para 4 pontos. O oponente pode aceitar ou recusar.',
  'rules.betting.rules.title': 'Regras dos Desafios',
  'rules.betting.rules.content': 'Os desafios só podem ser feitos na vez do jogador. Não é possível desafiar após jogar a carta. O desafio deve ser respondido antes de jogar a próxima carta.',

  'rules.winning.title': 'Condições de Vitória',
  'rules.winning.content': 'A partida é vencida quando um time alcança 12 pontos (ou o limite combinado).',
  'rules.winning.hand.title': 'Vencedor da Mão',
  'rules.winning.hand.content': 'Vence a mão o time que ganhar 2 das 3 rodadas. Em caso de empate (1-1), ninguém marca pontos.',
  'rules.winning.game.title': 'Vencedor da Partida',
  'rules.winning.game.content': 'Vence a partida o time que primeiro alcançar 12 pontos. Em algumas variações, é necessário vencer por 2 pontos de diferença.',

  'rules.flor.title': 'Flor',
  'rules.flor.content': 'Flor é uma declaração especial que pode ser feita quando um jogador tem três cartas do mesmo naipe. É uma adição opcional ao Truco Gaudério, inspirada em outras variações do jogo.',
  'rules.flor.definition.title': 'O que é Flor?',
  'rules.flor.definition.content': 'Flor ocorre quando um jogador recebe três cartas do mesmo naipe na distribuição inicial. O jogador pode declarar "Flor" antes de jogar qualquer carta.',
  'rules.flor.value.title': 'Valor da Flor',
  'rules.flor.value.content': 'O valor da Flor é calculado somando os valores das cartas do mesmo naipe + 20 pontos base. Cartas de face (10, J, Q, K) valem 0, Ás vale 1, e números valem seu valor facial.',
  'rules.flor.challenge.title': 'Desafiando a Flor',
  'rules.flor.challenge.content': 'Quando um jogador declara Flor, o oponente pode aceitar (comparar Flors) ou recusar (conceder os pontos da Flor ao desafiante). Se ambos tiverem Flor, vence quem tiver o maior valor.',
  'rules.flor.points.title': 'Pontos da Flor',
  'rules.flor.points.content': 'Flor vale 3 pontos. Se o desafio for aceito e você vencer, marca 3 pontos. Se for recusado, o oponente marca 3 pontos.',

  'rules.special.title': 'Situações Especiais',
  'rules.special.content': 'Existem algumas situações especiais no Truco Gaudério que merecem atenção.',
  'rules.special.manilhas.title': 'Manilhas',
  'rules.special.manilhas.content': 'As manilhas são sempre as cartas mais altas, independentemente do naipe. Entre manilhas, a ordem é: Ouros < Espadas < Copas < Paus.',
  'rules.special.ties.title': 'Empates',
  'rules.special.ties.content': 'Se duas cartas iguais forem jogadas na mesma rodada, a primeira carta jogada vence (ou pode ser considerado empate, dependendo da variação).',

  // Examples
  'rules.examples': 'Exemplos',

  // Strategy components
  'strategy.cards.in.hand': 'Cartas na mão:',
  'strategy.scenario': 'Cenário:',
  'strategy.solution': 'Solução:',

  // AI opponent
  'ai.cards': 'Cartas',

  // Home page
  'home.deck.description': 'Cartas exibidas em ordem de valor (maior para menor)',

  // Language toggle
  'lang.portuguese': 'Português',
  'lang.english': 'English',
};