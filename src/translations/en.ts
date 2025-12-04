export const enTranslations = {
  // Navigation
  'nav.home': 'Home',
  'nav.rules': 'Rules',
  'nav.tutorial': 'Tutorial',
  'nav.practice': 'Practice',
  'nav.strategy': 'Strategies',
  'nav.statistics': 'Statistics',
  'nav.back': 'Back to Home',

  // Home page
  'home.title': 'TrucoRS',
  'home.subtitle': 'Learn to play Truco Gaudério - the traditional card game from Rio Grande do Sul',
  'home.deck.title': 'Truco Deck (44 cards)',

  // Rules page
  'rules.title': 'Truco Gaudério Rules',
  'rules.subtitle': 'Complete reference of rules and game mechanics',
  'rules.search.placeholder': 'Search rules...',
  'rules.no.results': 'No rules found for',

  // Game board
  'game.title': 'Truco Gaudério',
  'game.hand': 'Hand',
  'game.round': 'Round',
  'game.score': 'Score',
  'game.opponent': 'Opponent',
  'game.player.hand': 'Your Hand',
  'game.player.turn': 'It\'s turn of',
  'game.player.name': 'You',
  'game.opponent1.name': 'Opponent 1',
  'game.opponent2.name': 'Opponent 2',
  'game.opponent3.name': 'Opponent 3',
  'game.has.flor': 'Has Flor',
  'game.flor.value': 'Flor: {value} points',
  'game.card.played': 'Card played',
  'game.hand.end': 'Hand Finished!',
  'game.game.end': 'Game Over!',
  'game.hand.won': 'You won the hand!',
  'game.hand.lost': 'Opponent won the hand!',
  'game.game.won': '🎉 You won the match! 🎉',
  'game.game.lost': 'Opponent won the match.',
  'game.next.round': 'Next Round',
  'game.next.hand': 'Next Hand',
  'game.reset': 'Reset Game',
  'game.start': 'Start Game',
  'game.played.cards': 'Played Cards',
  'game.waiting.cards': 'Waiting for cards to be played...',
  'game.round.winner': 'Round Winner',

  // Betting
  'bet.truco': 'Truco',
  'bet.retruco': 'Retruco',
  'bet.vale.quatro': 'Vale Quatro',
  'bet.accept': 'Accept',
  'bet.decline': 'Decline',

  // Rules content
  'rules.hierarchy.title': 'Card Hierarchy',
  'rules.hierarchy.content': 'In Truco Gaudério, the manilhas are fixed (there is no "vira").\n\nThe order of card strength is:\n1. Espadão (Ace of Swords)\n2. Bastião (Ace of Clubs)\n3. 7 of Swords\n4. 7 of Gold\n\nThen follow: all 3s, all 2s, Ace of Cups = Ace of Gold, all Kings, all Queens (Q), all Jacks (J), 7 of Cups = 7 of Clubs, all 6s, all 5s, all 4s.',

  'rules.envido.title': 'Envido',
  'rules.envido.content': 'Envido is a bet about who has the highest score in the initial hand, before playing cards.\n\nScoring:\n• Cards of the same suit add their values + 20\n• Face cards (10, 11, 12) are worth 0 for the sum\n• If you have different suits, the highest card alone counts\n\nThe maximum is 33 (7+6 of the same suit + 20).',

  'rules.flow.title': 'Game Flow',
  'rules.flow.content': 'Truco Gaudério is played in hands. Each hand has 3 rounds, and each player receives 3 cards at the start of the hand.',
  'rules.flow.hands.title': 'Hands',
  'rules.flow.hands.content': 'A hand begins with each player receiving 3 cards. It consists of up to 3 rounds. The player who wins 2 rounds wins the hand and scores points.',
  'rules.flow.game.title': 'Match',
  'rules.flow.game.content': 'A match is played until one team reaches 12 points (or another agreed limit).',

  'rules.scoring.title': 'Scoring System',
  'rules.scoring.content': 'Points are scored when a team wins a hand. The point value can be increased through challenges (truco, retruco, vale quatro).',
  'rules.scoring.base.title': 'Base Points',
  'rules.scoring.base.content': 'A won hand is worth 1 point by default. If there is a tie (1-1 in rounds), no one scores points.',
  'rules.scoring.challenges.title': 'Challenges',
  'rules.scoring.challenges.content': 'Challenges increase the point value: Truco (2 points), Retruco (3 points), Vale Quatro (4 points).',

  'rules.betting.title': 'Betting Mechanics (Challenges)',
  'rules.betting.content': 'During the game, players can challenge opponents, increasing the hand value.',
  'rules.betting.truco.title': 'Truco',
  'rules.betting.truco.content': 'The player who is playing can say "Truco", increasing the hand value to 2 points. The opponent can accept or decline. If they decline, they lose the hand and the challenger scores the points.',
  'rules.betting.retruco.title': 'Retruco',
  'rules.betting.retruco.content': 'If Truco was accepted, the opponent can respond with "Retruco", increasing to 3 points. The original challenger can accept or decline.',
  'rules.betting.vale.quatro.title': 'Vale Quatro',
  'rules.betting.vale.quatro.content': 'If Retruco was accepted, the original challenger can respond with "Vale Quatro", increasing to 4 points. The opponent can accept or decline.',
  'rules.betting.rules.title': 'Challenge Rules',
  'rules.betting.rules.content': 'Challenges can only be made on the player\'s turn. It is not possible to challenge after playing the card. The challenge must be responded to before playing the next card.',

  'rules.winning.title': 'Winning Conditions',
  'rules.winning.content': 'The match is won when a team reaches 12 points (or the agreed limit).',
  'rules.winning.hand.title': 'Hand Winner',
  'rules.winning.hand.content': 'The team that wins 2 of the 3 rounds wins the hand. In case of a tie (1-1), no one scores points.',
  'rules.winning.game.title': 'Match Winner',
  'rules.winning.game.content': 'The team that first reaches 12 points wins the match. In some variations, it is necessary to win by 2 points difference.',

  'rules.flor.title': 'Flor',
  'rules.flor.content': 'Flor is a special declaration that can be made when a player has three cards of the same suit. It is an optional addition to Truco Gaudério, inspired by other game variations.',
  'rules.flor.definition.title': 'What is Flor?',
  'rules.flor.definition.content': 'Flor occurs when a player receives three cards of the same suit in the initial deal. The player can declare "Flor" before playing any card.',
  'rules.flor.value.title': 'Flor Value',
  'rules.flor.value.content': 'The Flor value is calculated by adding the values of the cards of the same suit + 20 base points. Face cards (10, J, Q, K) are worth 0, Ace is worth 1, and numbers are worth their face value.',
  'rules.flor.challenge.title': 'Challenging Flor',
  'rules.flor.challenge.content': 'When a player declares Flor, the opponent can accept (compare Flors) or decline (grant the Flor points to the challenger). If both have Flor, the one with the highest value wins.',
  'rules.flor.points.title': 'Flor Points',
  'rules.flor.points.content': 'Flor is worth 3 points. If the challenge is accepted and you win, you score 3 points. If declined, the opponent scores 3 points.',

  'rules.special.title': 'Special Situations',
  'rules.special.content': 'There are some special situations in Truco Gaudério that deserve attention.',
  'rules.special.manilhas.title': 'Manilhas',
  'rules.special.manilhas.content': 'The manilhas are always the highest cards, regardless of suit. Among manilhas, the order is: Gold < Swords < Cups < Clubs.',
  'rules.special.ties.title': 'Ties',
  'rules.special.ties.content': 'If two equal cards are played in the same round, the first card played wins (or it may be considered a tie, depending on the variation).',

  // Examples
  'rules.examples': 'Examples',

  // Strategy components
  'strategy.cards.in.hand': 'Cards in hand:',
  'strategy.scenario': 'Scenario:',
  'strategy.solution': 'Solution:',

  // AI opponent
  'ai.cards': 'Cards',

  // Language toggle
  'lang.portuguese': 'Português',
  'lang.english': 'English',
};