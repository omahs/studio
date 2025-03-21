import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { IndexCoopContractFactory } from './contracts';
import { EthereumIndexCoopFarmContractPositionFetcher } from './ethereum/index-coop.farm.contract-position-fetcher';
import { EthereumIndexCoopIndexTokenFetcher } from './ethereum/index-coop.index.token-fetcher';
import { IndexCoopAppDefinition } from './index-coop.definition';

@Module({
  providers: [
    IndexCoopAppDefinition,
    IndexCoopContractFactory,
    EthereumIndexCoopIndexTokenFetcher,
    EthereumIndexCoopFarmContractPositionFetcher,
  ],
})
export class IndexCoopAppModule extends AbstractApp() {}
