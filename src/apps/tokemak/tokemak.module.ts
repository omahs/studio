import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { TokemakClaimableResolver } from './common/tokemak.claimable.resolver';
import { TokemakContractFactory } from './contracts';
import { EthereumTokemakAccTokeTokenFetcher } from './ethereum/tokemak.acc-toke.token-fetcher';
import { EthereumTokemakClaimableContractPositionFetcher } from './ethereum/tokemak.claimable.contract-position-fetcher';
import { EthereumTokemakFarmContractPositionFetcher } from './ethereum/tokemak.farm.contract-position-fetcher';
import { EthereumTokemakReactorTokenFetcher } from './ethereum/tokemak.reactor.token-fetcher';
import { TokemakAppDefinition } from './tokemak.definition';

@Module({
  providers: [
    TokemakAppDefinition,
    TokemakContractFactory,
    TokemakClaimableResolver,
    EthereumTokemakReactorTokenFetcher,
    EthereumTokemakFarmContractPositionFetcher,
    EthereumTokemakClaimableContractPositionFetcher,
    EthereumTokemakAccTokeTokenFetcher,
  ],
})
export class TokemakAppModule extends AbstractApp() {}
