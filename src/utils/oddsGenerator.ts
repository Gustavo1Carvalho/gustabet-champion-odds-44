/**
 * Sistema de geração de odds dinâmicas baseadas nos dados do jogo
 */

export interface GameData {
  homeTeam: string;
  awayTeam: string;
  league: string;
  isLive?: boolean;
  score?: { home: number; away: number };
  time?: string;
}

export interface TeamStrength {
  attack: number;
  defense: number;
  form: number;
  homeAdvantage?: number;
}

// Função para gerar força dos times baseado no nome/liga
export const getTeamStrength = (teamName: string, league: string, isHome: boolean = false): TeamStrength => {
  // Hash simples baseado no nome do time para consistência
  const hash = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Força base baseada na liga
  const leagueMultiplier = {
    'Premier League': 1.2,
    'Champions League': 1.3,
    'La Liga': 1.15,
    'Bundesliga': 1.1,
    'Serie A': 1.05,
    'Brasileirão': 1.0,
    'Copa do Brasil': 0.95,
    'Libertadores': 1.1
  };
  
  const multiplier = leagueMultiplier[league as keyof typeof leagueMultiplier] || 1.0;
  
  // Gerar stats baseadas no hash para consistência
  const baseAttack = 0.3 + (hash % 40) / 100; // 0.3 - 0.7
  const baseDefense = 0.3 + ((hash * 2) % 40) / 100; // 0.3 - 0.7  
  const baseForm = 0.4 + ((hash * 3) % 20) / 100; // 0.4 - 0.6
  
  return {
    attack: Math.min(0.9, baseAttack * multiplier),
    defense: Math.min(0.9, baseDefense * multiplier),
    form: Math.min(0.9, baseForm * multiplier),
    homeAdvantage: isHome ? 0.1 : 0
  };
};

// Gerar odds para resultado final (1X2)
export const generateMatchOdds = (gameData: GameData) => {
  const homeStrength = getTeamStrength(gameData.homeTeam, gameData.league, true);
  const awayStrength = getTeamStrength(gameData.awayTeam, gameData.league, false);
  
  // Calcular probabilidades baseadas na força dos times
  const homePower = homeStrength.attack + homeStrength.form + homeStrength.homeAdvantage - awayStrength.defense;
  const awayPower = awayStrength.attack + awayStrength.form - homeStrength.defense;
  
  // Normalizar probabilidades
  const total = homePower + awayPower + 0.5; // 0.5 para empate base
  const homeProb = Math.max(0.15, Math.min(0.65, homePower / total));
  const awayProb = Math.max(0.15, Math.min(0.65, awayPower / total));
  const drawProb = Math.max(0.15, 1 - homeProb - awayProb);
  
  // Converter para odds com margem da casa
  const margin = 1.05; // 5% margem
  
  return {
    home: ((1 / homeProb) * margin).toFixed(2),
    draw: ((1 / drawProb) * margin).toFixed(2),
    away: ((1 / awayProb) * margin).toFixed(2)
  };
};

// Gerar odds para total de gols
export const generateGoalsOdds = (gameData: GameData, line: number) => {
  const homeStrength = getTeamStrength(gameData.homeTeam, gameData.league, true);
  const awayStrength = getTeamStrength(gameData.awayTeam, gameData.league, false);
  
  // Calcular média esperada de gols
  const expectedGoals = (homeStrength.attack + awayStrength.attack) * 2.5 + 
                       (1 - (homeStrength.defense + awayStrength.defense) / 2) * 1.5;
  
  // Probabilidade de mais/menos baseada na distribuição de Poisson
  const lambda = Math.max(1, Math.min(4, expectedGoals));
  const overProb = 1 - poissonCDF(line, lambda);
  const underProb = 1 - overProb;
  
  const margin = 1.05;
  
  return {
    over: ((1 / overProb) * margin).toFixed(2),
    under: ((1 / underProb) * margin).toFixed(2)
  };
};

// Aproximação da CDF de Poisson
const poissonCDF = (k: number, lambda: number): number => {
  let sum = 0;
  for (let i = 0; i <= Math.floor(k); i++) {
    sum += Math.pow(lambda, i) * Math.exp(-lambda) / factorial(i);
  }
  return sum;
};

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

// Gerar odds para ambas marcam
export const generateBothTeamsScoreOdds = (gameData: GameData) => {
  const homeStrength = getTeamStrength(gameData.homeTeam, gameData.league, true);
  const awayStrength = getTeamStrength(gameData.awayTeam, gameData.league, false);
  
  // Probabilidade de cada time marcar
  const homeScoreProb = homeStrength.attack - awayStrength.defense + 0.6;
  const awayScoreProb = awayStrength.attack - homeStrength.defense + 0.5;
  
  const bothScoreProb = Math.max(0.2, Math.min(0.8, homeScoreProb * awayScoreProb));
  const notBothScoreProb = 1 - bothScoreProb;
  
  const margin = 1.05;
  
  return {
    yes: ((1 / bothScoreProb) * margin).toFixed(2),
    no: ((1 / notBothScoreProb) * margin).toFixed(2)
  };
};

// Gerar odds para escanteios
export const generateCornersOdds = (gameData: GameData, line: number) => {
  const homeStrength = getTeamStrength(gameData.homeTeam, gameData.league, true);
  const awayStrength = getTeamStrength(gameData.awayTeam, gameData.league, false);
  
  // Times mais atacantes geram mais escanteios
  const expectedCorners = (homeStrength.attack + awayStrength.attack) * 8 + 2;
  
  const overProb = expectedCorners > line ? 0.45 + (expectedCorners - line) * 0.05 : 0.35;
  const underProb = 1 - overProb;
  
  const margin = 1.05;
  
  return {
    over: ((1 / Math.max(0.25, Math.min(0.75, overProb))) * margin).toFixed(2),
    under: ((1 / Math.max(0.25, Math.min(0.75, underProb))) * margin).toFixed(2)
  };
};

// Gerar odds para cartões
export const generateCardsOdds = (gameData: GameData, line: number) => {
  const homeStrength = getTeamStrength(gameData.homeTeam, gameData.league, true);
  const awayStrength = getTeamStrength(gameData.awayTeam, gameData.league, false);
  
  // Liga mais competitiva = mais cartões
  const leagueIntensity = {
    'Premier League': 1.2,
    'La Liga': 1.1,
    'Serie A': 1.15,
    'Bundesliga': 1.0,
    'Brasileirão': 1.25,
    'Libertadores': 1.3
  };
  
  const intensity = leagueIntensity[gameData.league as keyof typeof leagueIntensity] || 1.0;
  const expectedCards = ((2 - homeStrength.defense) + (2 - awayStrength.defense)) * intensity + 2;
  
  const overProb = expectedCards > line ? 0.5 + (expectedCards - line) * 0.05 : 0.4;
  const underProb = 1 - overProb;
  
  const margin = 1.05;
  
  return {
    over: ((1 / Math.max(0.25, Math.min(0.75, overProb))) * margin).toFixed(2),
    under: ((1 / Math.max(0.25, Math.min(0.75, underProb))) * margin).toFixed(2)
  };
};

// Gerar nomes de jogadores baseados no time
export const generatePlayersForTeam = (teamName: string): string[] => {
  const playerPools = {
    brazilian: ['Gabriel', 'Pedro', 'Bruno', 'Luiz', 'Rafael', 'Carlos', 'Diego', 'Felipe', 'João', 'Lucas'],
    international: ['Silva', 'Santos', 'Costa', 'Pereira', 'Oliveira', 'Rodrigues', 'Ferreira', 'Alves', 'Barbosa', 'Ribeiro'],
    common: ['Anderson', 'Fernando', 'Ricardo', 'Marcelo', 'Thiago', 'Vinicius', 'Matheus', 'André', 'Igor', 'Gustavo']
  };
  
  // Hash do nome do time para consistência
  const hash = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const players: string[] = [];
  const pools = [playerPools.brazilian, playerPools.international, playerPools.common];
  
  for (let i = 0; i < 5; i++) {
    const poolIndex = (hash + i) % pools.length;
    const playerIndex = (hash + i * 3) % pools[poolIndex].length;
    const surname = playerPools.international[(hash + i * 7) % playerPools.international.length];
    
    players.push(`${pools[poolIndex][playerIndex]} ${surname}`);
  }
  
  return players;
};

// Gerar odds para jogadores
export const generatePlayerOdds = (playerName: string, marketType: string, teamStrength: TeamStrength) => {
  const hash = playerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const baseOdds = {
    "first-goal": 8 - teamStrength.attack * 3 + (hash % 20) / 10,
    "anytime-goal": 4 - teamStrength.attack * 1.5 + (hash % 15) / 10,
    "red-card": 25 + (hash % 100) / 10,
    "yellow-card": 6 - teamStrength.defense + (hash % 30) / 10
  };
  
  return Math.max(1.1, baseOdds[marketType as keyof typeof baseOdds] || 2.5).toFixed(2);
};