import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { BancorV3AppDefinition } from './bancor-v3.definition';
import { BancorV3ContractFactory } from './contracts';
import { EthereumBancorV3BntPoolTokenFetcher } from './ethereum/bancor-v3.bnt-pool.token-fetcher';
import { EthereumBancorV3FarmContractPositionFetcher } from './ethereum/bancor-v3.farm.contract-position-fetcher';
import { EthereumBancorV3PoolTokenFetcher } from './ethereum/bancor-v3.pool.token-fetcher';

@Module({
  providers: [
    BancorV3AppDefinition,
    BancorV3ContractFactory,
    EthereumBancorV3FarmContractPositionFetcher,
    EthereumBancorV3PoolTokenFetcher,
    EthereumBancorV3BntPoolTokenFetcher,
  ],
})
export class BancorV3AppModule extends AbstractApp() {}
