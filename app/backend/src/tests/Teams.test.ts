import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsModel from '../database/models/TeamsModel';

import { App } from '../app';
import { teams, team } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da Seção 2: Teams', () => {
  describe('Testando buscas de times', () => {
    it('É possível buscar todos os times com sucesso', async () => {
      sinon
        .stub(TeamsModel, "findAll")
        .resolves(teams as TeamsModel[]);
      
      const { body, status } = await chai.request(app).get('/teams');

      expect(body).to.deep.equal(teams);
      expect(status).to.equal(200);
    });
  
    it('É possível buscar um time por id com sucesso', async () => {
      sinon
        .stub(TeamsModel, "findByPk")
        .resolves(team as TeamsModel);

      const { body, status } = await chai.request(app).get('/teams/1');

      expect(body).to.deep.equal(team);
      expect(status).to.equal(200);
    });
  });

  afterEach(sinon.restore);
});