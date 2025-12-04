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
    title: 'rules.hierarchy.title',
    content: 'rules.hierarchy.content'
  },
  {
    id: 'envido',
    title: 'rules.envido.title',
    content: 'rules.envido.content'
  },
  {
    id: 'gameplay-flow',
    title: 'rules.flow.title',
    content: 'rules.flow.content',
    subsections: [
      {
        id: 'hands',
        title: 'rules.flow.hands.title',
        content: 'rules.flow.hands.content',
      },
      {
        id: 'game',
        title: 'rules.flow.game.title',
        content: 'rules.flow.game.content',
      },
    ],
  },
  {
    id: 'scoring',
    title: 'rules.scoring.title',
    content: 'rules.scoring.content',
    subsections: [
      {
        id: 'base-points',
        title: 'rules.scoring.base.title',
        content: 'rules.scoring.base.content',
      },
      {
        id: 'challenges',
        title: 'rules.scoring.challenges.title',
        content: 'rules.scoring.challenges.content',
      },
    ],
  },
  {
    id: 'betting',
    title: 'rules.betting.title',
    content: 'rules.betting.content',
    subsections: [
      {
        id: 'truco',
        title: 'rules.betting.truco.title',
        content: 'rules.betting.truco.content',
      },
      {
        id: 'retruco',
        title: 'rules.betting.retruco.title',
        content: 'rules.betting.retruco.content',
      },
      {
        id: 'vale-quatro',
        title: 'rules.betting.vale.quatro.title',
        content: 'rules.betting.vale.quatro.content',
      },
      {
        id: 'betting-rules',
        title: 'rules.betting.rules.title',
        content: 'rules.betting.rules.content',
      },
    ],
  },
  {
    id: 'winning-conditions',
    title: 'rules.winning.title',
    content: 'rules.winning.content',
    subsections: [
      {
        id: 'hand-winner',
        title: 'rules.winning.hand.title',
        content: 'rules.winning.hand.content',
      },
      {
        id: 'game-winner',
        title: 'rules.winning.game.title',
        content: 'rules.winning.game.content',
      },
    ],
  },
  {
    id: 'flor',
    title: 'rules.flor.title',
    content: 'rules.flor.content',
    subsections: [
      {
        id: 'flor-definition',
        title: 'rules.flor.definition.title',
        content: 'rules.flor.definition.content',
      },
      {
        id: 'flor-value',
        title: 'rules.flor.value.title',
        content: 'rules.flor.value.content',
      },
      {
        id: 'flor-challenge',
        title: 'rules.flor.challenge.title',
        content: 'rules.flor.challenge.content',
      },
      {
        id: 'flor-points',
        title: 'rules.flor.points.title',
        content: 'rules.flor.points.content',
      },
    ],
  },
  {
    id: 'special-situations',
    title: 'rules.special.title',
    content: 'rules.special.content',
    subsections: [
      {
        id: 'manilhas',
        title: 'rules.special.manilhas.title',
        content: 'rules.special.manilhas.content',
      },
      {
        id: 'ties',
        title: 'rules.special.ties.title',
        content: 'rules.special.ties.content',
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

