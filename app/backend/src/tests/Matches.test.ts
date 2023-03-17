import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesModel from '../database/models/MatchesModel';

import { App } from '../app';
import { editMatchBody, equalTeamsBody, invalidTeamsBody, matches, newMatch, newMatchBody } from './mocks/matches.mocks';
import { rightUser } from './mocks/user.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da Seção 3: Matches', () => {
  describe('Testando buscas de partidas', () => {
    it('É possível buscar todas as partidas com sucesso', async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(matches as unknown as MatchesModel[]);
      
      const { body, status } = await chai.request(app).get('/matches');

      expect(body).to.deep.equal(matches);
      expect(status).to.equal(200);
    });
  });

  describe('Testando salvamento de partidas', () => {
    it('É possível salvar uma nova partida com sucesso', async () => {
      sinon
        .stub(MatchesModel, "create")
        .resolves(newMatch as unknown as MatchesModel);
      
      const { body: { token } } = await chai.request(app).post('/login').send(rightUser);

      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(newMatchBody)
        .set({ authorization: token })

      expect(body).to.deep.equal(newMatch);
      expect(status).to.equal(201);
    });
  
    it('Não é possível salvar uma partida com token inválido', async () => {
      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(newMatchBody)
        .set({ authorization: 'tokenInválido' });

      expect(body.message).to.equal('Token must be a valid token');
      expect(status).to.equal(401);
    });

    it('Não é possível salvar uma partida com times iguais', async () => { 
      const { body: { token } } = await chai.request(app).post('/login').send(rightUser);

      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(equalTeamsBody)
        .set({ authorization: token });

      expect(body.message).to.equal('It is not possible to create a match with two equal teams');
      expect(status).to.equal(422);
    });

    it('Não é possível salvar uma partida com algum time inexistente', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(rightUser);

      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(invalidTeamsBody)
        .set({ authorization: token });

      expect(body.message).to.equal('There is no team with such id!');
      expect(status).to.equal(404);
    });
  });

  describe('Testando encerramento de partidas', () => {
    it('É possível encerrar uma partida com sucesso', async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves(undefined);
      
      const { body, status } = await chai.request(app).patch('/matches/1/finish');

      expect(body.message).to.equal('Finished');
      expect(status).to.equal(200);
    });
  });

  describe('Testando edição de partidas', () => {
    it('É possível editar uma partida com sucesso', async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves(undefined);
      
      const { body, status } = await chai.request(app).patch('/matches/1').send(editMatchBody);

      expect(body.message).to.equal('Edited');
      expect(status).to.equal(200);
    });
  });

  afterEach(sinon.restore);
});