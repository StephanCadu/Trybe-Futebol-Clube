import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UserModel from '../database/models/UserModel';
import {
  completeUser,
  noEmailUser,
  noPassUser,
  rightUser,
  wrongEmailUser,
  wrongPassUser,
} from './mocks/user.mocks';
import * as jwt from 'jsonwebtoken';


import { Response } from 'superagent';
import IUser from '../interfaces/IUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da Seção 1: Users e Login', () => {
  describe('Testando retornos com credenciais faltando', () => {
    it('Não é possível fazer login com o email faltando', async () => {
      const { body, status } = await chai.request(app).post('/login').send(noEmailUser);
  
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
      expect(status).to.equal(400);
    });
  
    it('Não é possível fazer login com a senha faltando', async () => {
      const { body, status } = await chai.request(app).post('/login').send(noPassUser);
  
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
      expect(status).to.equal(400);
    });
  });
  
  describe('Testando retornos com credenciais incorretas', () => {
    it('Não é possível fazer login com o email inválido', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(null);
  
      const { body, status } = await chai.request(app).post('/login').send(wrongEmailUser);
  
      expect(body).to.deep.equal({ message: 'Incorrect email or password' });
      expect(status).to.equal(401);
    });
  
    it('Não é possível fazer login com a senha inválida', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(completeUser as UserModel);
  
      const { body, status } = await chai.request(app).post('/login').send(wrongPassUser);
  
      expect(body).to.deep.equal({ message: 'Incorrect email or password' });
      expect(status).to.equal(401);
    });
  });
  
  describe('Testando retorno com credenciais corretas', () => {
    it('É possível fazer login com os dados válidos', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(completeUser as IUser | any);
  
      const { body, status } = await chai.request(app).post('/login').send(rightUser);
  
      expect(body).to.haveOwnProperty('token');
      expect(status).to.equal(200);
    });
  });

  describe('Testando retornos da rota /validate', () => {
    it('Não é possível buscar um usuário sem token', async () => {
      const { body, status } = await chai.request(app).get('/login/validate');
  
      expect(body.message).to.equal('Token not found');
      expect(status).to.equal(404);
    });

    it('Não é possível buscar um usuário com token inválido', async () => {  
      const { body, status } = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: 'tokenInválido' });
  
      expect(body.message).to.equal('Token must be a valid token');
      expect(status).to.equal(401);
    });

    it('É possível buscar um usuário com token válido', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(rightUser);
  
      const { body, status } = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: token });
  
      expect(body).to.deep.equal({ role: 'user' });
      expect(status).to.equal(200);
    });
  });

  afterEach(sinon.restore);
});