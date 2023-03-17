import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import LeaderboardService from '../services/LeaderboardService';
import { awayLeaderboard, homeLeaderboard, totalLeaderboard } from './mocks/leaderboard.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da Seção 4: Leaderboard', () => {
  describe('Testando buscas de times', () => {
    it('É possível buscar o placar dos jogos da casa com sucesso', async () => {
      sinon
        .stub(LeaderboardService, "getLeaderboard")
        .resolves(homeLeaderboard as any);
    
      const { body, status } = await chai.request(app).get('/leaderboard/home');

      expect(body).to.deep.equal(homeLeaderboard);
      expect(status).to.equal(200);
    });

    it('É possível buscar o placar dos jogos de fora com sucesso', async () => {
      sinon
        .stub(LeaderboardService, "getLeaderboard")
        .resolves(awayLeaderboard as any);
      
      const { body, status } = await chai.request(app).get('/leaderboard/home');

      expect(body).to.deep.equal(awayLeaderboard);
      expect(status).to.equal(200);
    });
  
    it('É possível buscar o placar total com sucesso', async () => {
      sinon
        .stub(LeaderboardService, "getLeaderboard")
        .resolves(totalLeaderboard as any);
      
      const { body, status } = await chai.request(app).get('/leaderboard/home');

      expect(body).to.deep.equal(totalLeaderboard);
      expect(status).to.equal(200);
    });
  });

  afterEach(sinon.restore);
});