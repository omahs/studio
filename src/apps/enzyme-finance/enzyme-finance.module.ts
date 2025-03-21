import { Module } from '@nestjs/common';

import { AbstractApp } from '~app/app.dynamic-module';

import { EnzymeFinanceContractFactory } from './contracts';
import { EnzymeFinanceAppDefinition } from './enzyme-finance.definition';
import { EthereumEnzymeFinanceVaultTokenFetcher } from './ethereum/enzyme-finance.vault.token-fetcher';

@Module({
  providers: [EnzymeFinanceAppDefinition, EnzymeFinanceContractFactory, EthereumEnzymeFinanceVaultTokenFetcher],
})
export class EnzymeFinanceAppModule extends AbstractApp() {}
