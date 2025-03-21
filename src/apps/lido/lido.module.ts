import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { LidoContractFactory } from './contracts';
import { EthereumLidoStethTokenFetcher } from './ethereum/lido.steth.token-fetcher';
import { EthereumLidoWstethTokenFetcher } from './ethereum/lido.wsteth.token-fetcher';
import { LidoAppDefinition } from './lido.definition';
import { MoonriverLidoStksmTokenFetcher } from './moonriver/lido.stksm.token-fetcher';

@Module({
  providers: [
    LidoAppDefinition,
    LidoContractFactory,
    EthereumLidoStethTokenFetcher,
    EthereumLidoWstethTokenFetcher,
    MoonriverLidoStksmTokenFetcher,
  ],
})
export class LidoAppModule extends AbstractApp() {}
