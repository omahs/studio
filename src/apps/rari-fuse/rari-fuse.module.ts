import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { RariFuseContractFactory } from './contracts';
import { EthereumRariFuseBorrowContractPositionFetcher } from './ethereum/rari-fuse.borrow.contract-position-fetcher';
import { EthereumRariFusePositionPresenter } from './ethereum/rari-fuse.position-presenter';
import { EthereumRariFuseSupplyTokenFetcher } from './ethereum/rari-fuse.supply.token-fetcher';
import { RariFuseAppDefinition } from './rari-fuse.definition';

@Module({
  providers: [
    RariFuseAppDefinition,
    RariFuseContractFactory,
    // Ethereum
    EthereumRariFuseBorrowContractPositionFetcher,
    EthereumRariFuseSupplyTokenFetcher,
    EthereumRariFusePositionPresenter,
  ],
})
export class RariFuseAppModule extends AbstractApp() {}
