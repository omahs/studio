import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { PolygonStakingContractFactory } from './contracts';
import { EthereumPolygonStakingContractPositionFetcher } from './ethereum/polygon-staking.deposit.contract-position-fetcher';
import { PolygonStakingAppDefinition } from './polygon-staking.definition';

@Module({
  providers: [
    PolygonStakingAppDefinition,
    PolygonStakingContractFactory,
    EthereumPolygonStakingContractPositionFetcher,
  ],
})
export class PolygonStakingAppModule extends AbstractApp() {}
