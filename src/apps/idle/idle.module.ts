import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { IdleContractFactory } from './contracts';
import { EthereumIdleVaultContractPositionFetcher } from './ethereum/idle.vault.contract-position-fetcher';
import { EthereumIdleVaultTokenFetcher } from './ethereum/idle.vault.token-fetcher';
import { IdleAppDefinition } from './idle.definition';

@Module({
  providers: [
    IdleAppDefinition,
    IdleContractFactory,
    EthereumIdleVaultContractPositionFetcher,
    EthereumIdleVaultTokenFetcher,
  ],
})
export class IdleAppModule extends AbstractApp() {}
